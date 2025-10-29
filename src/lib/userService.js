import { MongoClient } from 'mongodb';
import bcrypt from 'bcryptjs';

const MONGODB_URI = process.env.MONGO_URI;

export class UserService {
  static async createUser(userData) {
    const client = await MongoClient.connect(MONGODB_URI);
    const db = client.db();
    const usersCollection = db.collection('users');

    try {
      // Hash password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(userData.password, salt);

      // Create user document
      const userDoc = {
        name: userData.name,
        email: userData.email.toLowerCase(),
        phone: userData.phone || '',
        password: hashedPassword,
        isEmailVerified: false,
        emailVerificationOTP: userData.otp,
        emailVerificationOTPExpires: userData.otpExpiry,
        role: 'customer',
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date()
      };

      const result = await usersCollection.insertOne(userDoc);
      
      return {
        success: true,
        userId: result.insertedId,
        user: { ...userDoc, _id: result.insertedId }
      };
    } catch (error) {
      throw error;
    } finally {
      await client.close();
    }
  }

  static async findUserByEmail(email) {
    const client = await MongoClient.connect(MONGODB_URI);
    const db = client.db();
    const usersCollection = db.collection('users');

    try {
      const user = await usersCollection.findOne({ email: email.toLowerCase() });
      return user;
    } finally {
      await client.close();
    }
  }

  static async updateUser(userId, updates) {
    const client = await MongoClient.connect(MONGODB_URI);
    const db = client.db();
    const usersCollection = db.collection('users');

    try {
      updates.updatedAt = new Date();
      
      console.log('Updating user:', userId, 'with:', {
        ...updates,
        password: updates.password ? '***hashed***' : undefined
      });

      const result = await usersCollection.updateOne(
        { _id: userId },
        { $set: updates }
      );

      console.log('Update result:', {
        matched: result.matchedCount,
        modified: result.modifiedCount
      });

      return result.modifiedCount > 0;
    } finally {
      await client.close();
    }
  }

  static async verifyPassword(plainPassword, hashedPassword) {
    if (!plainPassword || !hashedPassword) {
      console.error('Missing password for comparison:', {
        hasPlain: !!plainPassword,
        hasHashed: !!hashedPassword
      });
      return false;
    }
    return await bcrypt.compare(plainPassword, hashedPassword);
  }

  static generateOTP() {
    return Math.floor(100000 + Math.random() * 900000).toString();
  }

  // Helper to check password without hashing (for debugging)
  static async debugPassword(userId, plainPassword) {
    const client = await MongoClient.connect(MONGODB_URI);
    const db = client.db();
    
    try {
      const user = await db.collection('users').findOne({ _id: userId });
      
      if (!user) return { error: 'User not found' };
      
      const isValid = await bcrypt.compare(plainPassword, user.password);
      
      return {
        hasPassword: !!user.password,
        passwordHash: user.password?.substring(0, 20) + '...',
        isValid
      };
    } finally {
      await client.close();
    }
  }
}
