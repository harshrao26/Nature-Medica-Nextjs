import { NextResponse } from 'next/server';
import { MongoClient } from 'mongodb';
import bcrypt from 'bcryptjs';

export async function POST(req) {
  try {
    const { email, password, name } = await req.json();

    // Default admin credentials if not provided
    const adminEmail = email || 'admin@naturemedica.com';
    const adminPassword = password || 'Admin@123456';
    const adminName = name || 'Admin User';

    const client = await MongoClient.connect(process.env.MONGO_URI);
    const db = client.db();
    const usersCollection = db.collection('users');

    // Check if admin already exists
    const existingAdmin = await usersCollection.findOne({ email: adminEmail });

    if (existingAdmin) {
      await client.close();
      return NextResponse.json({ 
        message: 'Admin already exists',
        email: adminEmail
      });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(adminPassword, salt);

    // Create admin user
    const adminDoc = {
      name: adminName,
      email: adminEmail,
      phone: '',
      password: hashedPassword,
      isEmailVerified: true, // Admin is pre-verified
      role: 'admin',
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    const result = await usersCollection.insertOne(adminDoc);
    await client.close();

    return NextResponse.json({ 
      message: '✅ Admin user created successfully!',
      admin: {
        _id: result.insertedId,
        name: adminName,
        email: adminEmail,
        role: 'admin'
      },
      credentials: {
        email: adminEmail,
        password: adminPassword // Only show in response, remove in production
      }
    });

  } catch (error) {
    console.error('Seed admin error:', error);
    return NextResponse.json({ 
      error: error.message 
    }, { status: 500 });
  }
}

// GET method to create with default credentials
export async function GET() {
  try {
    const adminEmail = 'admin@naturemedica.com';
    const adminPassword = 'Admin@123456';
    const adminName = 'Admin User';

    const client = await MongoClient.connect(process.env.MONGO_URI);
    const db = client.db();
    const usersCollection = db.collection('users');

    // Check if admin exists
    const existingAdmin = await usersCollection.findOne({ email: adminEmail });

    if (existingAdmin) {
      await client.close();
      return NextResponse.json({ 
        message: '⚠️ Admin already exists',
        email: adminEmail,
        note: 'Use POST method to create with custom credentials'
      });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(adminPassword, salt);

    // Create admin
    const adminDoc = {
      name: adminName,
      email: adminEmail,
      phone: '',
      password: hashedPassword,
      isEmailVerified: true,
      role: 'admin',
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    const result = await usersCollection.insertOne(adminDoc);
    await client.close();

    return NextResponse.json({ 
      message: '✅ Admin user created successfully!',
      credentials: {
        email: adminEmail,
        password: adminPassword,
        loginUrl: '/auth?admin=true'
      },
      admin: {
        _id: result.insertedId,
        name: adminName,
        email: adminEmail,
        role: 'admin'
      }
    });

  } catch (error) {
    console.error('Seed admin error:', error);
    return NextResponse.json({ 
      error: error.message 
    }, { status: 500 });
  }
}
