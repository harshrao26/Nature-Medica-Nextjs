import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import User from '@/models/User';

export async function GET() {
  try {
    await connectDB();
    
    const testUser = {
      name: 'Test User',
      email: 'test@test.com',
      password: 'hashedpassword123',
      phone: '1234567890'
    };
    
    console.log('Creating test user with:', testUser);
    
    const user = new User(testUser);
    console.log('User object created:', user.toObject());
    
    return NextResponse.json({ 
      success: true, 
      user: user.toObject() 
    });
  } catch (error) {
    console.error('Test error:', error);
    return NextResponse.json({ 
      error: error.message,
      details: error.errors 
    }, { status: 500 });
  }
}
