import { NextResponse, NextRequest } from 'next/server'; // Import the correct types
import clientPromise from '../../../../lib/mongodb';

// Remove the custom type definition for NextRequest

const connectMongo = async () => {
  try {
    const client = await clientPromise;
    const db = client.db('GIGO');
    return db;
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    throw new Error('Failed to connect to MongoDB');
  }
};

export async function POST(request: NextRequest) { // Use NextRequest directly
  try {
    const { search } = await request.json();
    if (!search || search.trim() === "") {
      return NextResponse.json({ error: "Search term is required" }, { status: 400 });
    }

    const db = await connectMongo();
    const Gigs = await db.collection('gigs').find({
      keywords: { $regex: `.*${search}.*`, $options: 'i' } // Partial, case-insensitive match
    }).toArray();

    return NextResponse.json(Gigs);
  } catch (error) {
    console.error('POST Error:', error);
    return NextResponse.json({ error: 'Failed to fetch filtered Gigs' }, { status: 500 });
  }
}
