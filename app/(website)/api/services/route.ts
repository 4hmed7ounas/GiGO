// src/app/api/services/route.ts
import clientPromise from '@/lib/mongodb';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db('GIGO');
    const services = await db.collection('services').find({}).toArray();

    return NextResponse.json(services);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to fetch services' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const client = await clientPromise;
    const db = client.db('GIGO');
    const data = await request.json();

    const result = await db.collection('services').insertOne(data);

    return NextResponse.json({ message: 'Service created successfully', result }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to create service' }, { status: 500 });
  }
}
