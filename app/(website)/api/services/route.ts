import clientPromise from '@/lib/mongodb';
import Service from '@/models/service'; // Mongoose model
import { NextResponse } from 'next/server';

const connectMongo = async () => {
  try {
    // Wait for the MongoClient connection to be resolved
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
    const services = await db.collection('services').find({}).toArray();
    return NextResponse.json(services);
  } catch (error) {
    console.error('GET Error:', error);
    return NextResponse.json({ error: 'Failed to fetch services' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const db = await connectMongo(); // Ensure connection before insertion
    const data = await request.json();
    const { title, keyWords, description, tiers, images, userId } = data; // Include userId in the request data

    // Create a new service with the userId
    const newService = new Service({
      title,
      keyWords,
      description,
      tiers,
      images,
      userId, 
    });
    console.log(userId)

    const result = await db.collection('services').insertOne(newService);
    return NextResponse.json({ message: 'Service created successfully', result }, { status: 201 });
  } catch (error) {
    console.error('POST Error:', error);
    return NextResponse.json({ error: 'Failed to create service' }, { status: 500 });
  }
}
