import { MongoClient } from 'mongodb';

const uri: string = "mongodb+srv://hadeed:hadeeddata@cluster0.vmrd5.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"; // Directly using the MongoDB URI
const options: object = {};

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

// Define a global interface for the MongoClient promise
interface Global {
  mongoClientPromise?: Promise<MongoClient>;
}

// Type assertion for globalThis
const globalWithMongoClientPromise = globalThis as Global;

// In development mode, reuse the MongoClient instance to avoid multiple connections
if (process.env.NODE_ENV === 'development') {
  if (!globalWithMongoClientPromise.mongoClientPromise) {
    client = new MongoClient(uri, options);
    globalWithMongoClientPromise.mongoClientPromise = client.connect();
  }
  clientPromise = globalWithMongoClientPromise.mongoClientPromise;
} else {
  // In production, create a new MongoClient instance
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

export default clientPromise;
