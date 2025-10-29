import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import User from '@/models/User';
import { sendOTPEmail } from '@/lib/email';

export async function POST(req) {
  try {
    await connectDB();

    const { email, type } = await req.json(); // type: 'verification' or 'reset'

    if (!email) {
      return NextResponse.json({ 
        error: 'Email is required' 
      }, { status: 400 });
    }

    const user = await User.findOne({ email: email.toLowerCase() });

    if (!user) {
      return NextResponse.json({ 
        error: 'User not found' 
      }, { status: 404 });
    }

    // Generate new OTP
    const otp = user.generateOTP();

    if (type === 'verification') {
      user.emailVerificationOTP = otp;
      user.emailVerificationOTPExpires = new Date(Date.now() + 10 * 60 * 1000);
    } else {
      user.resetPasswordOTP = otp;
      user.resetPasswordOTPExpires = new Date(Date.now() + 10 * 60 * 1000);
    }

    await user.save();

    // Send OTP email
    await sendOTPEmail(email, otp, type);

    return NextResponse.json({ 
      message: 'OTP sent successfully'
    });

  } catch (error) {
    console.error('Resend OTP error:', error);
    return NextResponse.json({ 
      error: 'Failed to resend OTP' 
    }, { status: 500 });
  }
}
