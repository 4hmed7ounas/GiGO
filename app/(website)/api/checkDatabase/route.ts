import clientPromise from '@/lib/mongodb';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const client = await clientPromise;
    await client.db('hadeed').command({ ping: 1 }); // Ping the database to check the connection
    return NextResponse.json({ message: 'Database connected successfully!' });
  } catch (error) {
    console.error('Failed to connect to the database:', error);
    return NextResponse.json({ error: 'Failed to connect to the database' }, { status: 500 });
  }
}
