import { NextResponse } from 'next/server';

export async function POST(req) {
  const response = NextResponse.json({ 
    message: 'Logged out successfully' 
  });

  // Clear the token cookie
  response.cookies.set('token', '', {
    httpOnly: true,
    expires: new Date(0)
  });

  return response;
}
