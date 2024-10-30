// D:\GiGO\app\(webapp)\api\showGig\[gigId].ts
import { ObjectId } from 'mongodb';
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

export async function GET(req: Request, { params }: { params: { gigId: string } }) {
  const { gigId } = params;

  if (!gigId) {
    return NextResponse.json({ error: 'Gig ID is required' }, { status: 400 });
  }

  try {
    const db = await connectMongo();
    const service = await db.collection('gigs').findOne({ _id: new ObjectId(gigId) });
    
    if (!service) {
      return NextResponse.json({ error: 'Service not found' }, { status: 404 });
    }
    
    return NextResponse.json(service, { status: 200 });
  } catch (error) {
    console.error('Error fetching service:', error);
    return NextResponse.json({ error: 'Failed to fetch service details' }, { status: 500 });
  }
}
