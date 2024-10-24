import Service from '../../../../models/service'; // Mongoose model
import { NextResponse } from 'next/server';
import clientPromise from '../../../../lib/mongodb';

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
    const { title, keyWords, description, tiers, images } = data;
    const newService = new Service({
      title,
      keyWords,
      description,
      tiers,
      images,
    });

    const result = await db.collection('services').insertOne(newService);
    return NextResponse.json({ message: 'Service created successfully', result }, { status: 201 });
  } catch (error) {
    console.error('POST Error:', error);
    return NextResponse.json({ error: 'Failed to create service' }, { status: 500 });
  }
}
