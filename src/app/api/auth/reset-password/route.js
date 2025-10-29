import { NextResponse } from 'next/server';
import { UserService } from '@/lib/userService';
import bcrypt from 'bcryptjs';

export async function POST(req) {
  try {
    const { email, otp, newPassword } = await req.json();

    console.log('Reset password request:', { email, otp: otp?.substring(0, 3) + '***' });

    // Validation
    if (!email || !otp || !newPassword) {
      return NextResponse.json({ 
        error: 'All fields are required' 
      }, { status: 400 });
    }

    if (newPassword.length < 6) {
      return NextResponse.json({ 
        error: 'Password must be at least 6 characters long' 
      }, { status: 400 });
    }

    // Find user
    const user = await UserService.findUserByEmail(email);

    if (!user) {
      return NextResponse.json({ 
        error: 'Invalid request' 
      }, { status: 400 });
    }

    console.log('User found:', { 
      email: user.email, 
      hasResetOTP: !!user.resetPasswordOTP,
      resetOTPExpires: user.resetPasswordOTPExpires
    });

    // Verify OTP
    if (!user.resetPasswordOTP || user.resetPasswordOTP !== otp) {
      return NextResponse.json({ 
        error: 'Invalid OTP' 
      }, { status: 400 });
    }

    // Check if OTP expired
    if (!user.resetPasswordOTPExpires || new Date() > new Date(user.resetPasswordOTPExpires)) {
      return NextResponse.json({ 
        error: 'OTP has expired. Please request a new one.' 
      }, { status: 400 });
    }

    // Hash the new password
    console.log('Hashing new password...');
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);
    console.log('Password hashed successfully');

    // Update user with new password and clear OTP
    await UserService.updateUser(user._id, {
      password: hashedPassword,
      resetPasswordOTP: null,
      resetPasswordOTPExpires: null
    });

    console.log('Password updated successfully');

    return NextResponse.json({ 
      message: 'Password reset successfully! You can now login with your new password.'
    });

  } catch (error) {
    console.error('Reset password error:', error);
    return NextResponse.json({ 
      error: 'Failed to reset password. Please try again.' 
    }, { status: 500 });
  }
}
