import { NextRequest, NextResponse } from 'next/server';
import clientPromise from '../../../../lib/mongodb';

// MongoDB connection setup
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

// Dynamic API route to fetch gigs by userId
export async function POST(request: NextRequest) {
  try {
    // Retrieve userId from the request body
    const { userId } = await request.json();

    if (!userId) {
      return NextResponse.json({ message: "User ID is required" }, { status: 400 });
    }

    // Connect to MongoDB
    const db = await connectMongo();

    // Query the gigs collection to fetch gigs by userId
    const gigs = await db.collection('gigs').find({ userId }).toArray();

    if (gigs.length === 0) {
      return NextResponse.json({ message: "No gigs found for the provided user ID" }, { status: 404 });
    }

    // Return the gigs
    return NextResponse.json(gigs, { status: 200 });

  } catch (error) {
    console.error('Error fetching gigs:', error);
    return NextResponse.json({ message: "Error fetching gigs" }, { status: 500 });
  }
}