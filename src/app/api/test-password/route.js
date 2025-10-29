import { NextResponse } from 'next/server';
import { UserService } from '@/lib/userService';

export async function POST(req) {
  try {
    const { email, password } = await req.json();
    
    const user = await UserService.findUserByEmail(email);
    
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const result = await UserService.debugPassword(user._id, password);
    
    return NextResponse.json({
      email: user.email,
      userId: user._id,
      ...result
    });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
