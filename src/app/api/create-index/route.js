import { NextResponse } from 'next/server';
import { MongoClient } from 'mongodb';

export async function GET() {
  const client = await MongoClient.connect(process.env.MONGO_URI);
  const db = client.db();
  
  try {
    await db.collection('users').createIndex({ email: 1 }, { unique: true });
    await client.close();
    
    return NextResponse.json({ message: 'Index created' });
  } catch (error) {
    await client.close();
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
