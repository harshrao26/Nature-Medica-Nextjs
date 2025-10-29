import { MongoClient } from 'mongodb';
import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    const { email } = await req.json();
    
    const client = await MongoClient.connect(process.env.MONGO_URI);
    const db = client.db();
    
    const result = await db.collection('users').deleteOne({ 
      email: email.toLowerCase() 
    });
    
    await client.close();
    
    return NextResponse.json({ 
      message: `Deleted ${result.deletedCount} user(s)` 
    });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
