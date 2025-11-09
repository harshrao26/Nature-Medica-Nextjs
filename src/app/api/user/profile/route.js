import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import User from '@/models/User';
import { requireAuth } from '@/middleware/auth';

export async function GET(req) {
  try {
    await connectDB();
    const authData = await requireAuth(req);

    const userDoc = await User.findById(authData.userId);

    if (!userDoc) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Convert mongoose doc to plain object
    const userPlain = userDoc.toObject ? userDoc.toObject() : userDoc;

    // Build sanitized user response object
    const user = {
      _id: userPlain._id,
      name: userPlain.name,
      email: userPlain.email,
      phone: userPlain.phone,
      role: userPlain.role,
      isEmailVerified: userPlain.isEmailVerified,
      addresses: Array.isArray(userPlain.addresses) ? userPlain.addresses : [],
      isActive: userPlain.isActive,
      createdAt: userPlain.createdAt,
      updatedAt: userPlain.updatedAt,
    };

    return NextResponse.json({ user });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(req) {
  try {
    await connectDB();
    const authData = await requireAuth(req);

    const { name, email, phone } = await req.json();

    // Check if email is already taken by another user
    if (email) {
      const existingUser = await User.findOne({ 
        email, 
        _id: { $ne: authData.userId } 
      });
      if (existingUser) {
        return NextResponse.json(
          { error: 'Email already in use' },
          { status: 400 }
        );
      }
    }

    // Update user profile
    const userDoc = await User.findByIdAndUpdate(
      authData.userId,
      { name, email, phone },
      { new: true, runValidators: true }
    );

    if (!userDoc) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const userPlain = userDoc.toObject ? userDoc.toObject() : userDoc;

    const user = {
      _id: userPlain._id,
      name: userPlain.name,
      email: userPlain.email,
      phone: userPlain.phone,
      role: userPlain.role,
      isEmailVerified: userPlain.isEmailVerified,
      addresses: Array.isArray(userPlain.addresses) ? userPlain.addresses : [],
      isActive: userPlain.isActive,
      createdAt: userPlain.createdAt,
      updatedAt: userPlain.updatedAt,
    };

    return NextResponse.json({
      message: 'Profile updated successfully',
      user
    });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
