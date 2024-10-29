import { NextResponse } from 'next/server';
import clientPromise from '../../../../lib/mongodb';
import Gigy from '../../../../models/gig'; // Mongoose model

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

export async function GET() {
  try {
    const db = await connectMongo(); // Ensure connection before querying
    const Gigs = await db.collection('gigs').find({}).toArray();
    return NextResponse.json(Gigs);
  } catch (error) {
    console.error('GET Error:', error);
    return NextResponse.json({ error: 'Failed to fetch Gigs' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const db = await connectMongo(); // Ensure connection before insertion
    const data = await request.json();
    const { title, keywords, description, tier, imageURL, userId } = data; // Include userId

    const newGigy = new Gigy({
      title,
      keywords,
      description,
      tier,
      imageURL,
      userId,
    });

    const result = await db.collection('gigs').insertOne(newGigy);
    return NextResponse.json(
      { message: 'Gig created successfully', result },
      { status: 201 }
    );
  } catch (error) {
    console.error('POST Error:', error);
    return NextResponse.json({ error: 'Failed to create Gig' }, { status: 500 });
  }
}

