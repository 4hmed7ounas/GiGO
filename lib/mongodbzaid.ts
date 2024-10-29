import { MongoClient } from 'mongodb';

const uri: string = "mongodb+srv://zaidsharazi:zaid@cluster0.m2jfo.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"; // Directly using the MongoDB URI

const options = {
  serverSelectionTimeoutMS: 5000,
  socketTimeoutMS: 45000,
};

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

interface Global {
  mongoClientPromise?: Promise<MongoClient>;
}

const globalWithMongoClientPromise = globalThis as Global;

if (process.env.NODE_ENV === 'development') {
  if (!globalWithMongoClientPromise.mongoClientPromise) {
    client = new MongoClient(uri, options);
    globalWithMongoClientPromise.mongoClientPromise = client.connect();
  }
  clientPromise = globalWithMongoClientPromise.mongoClientPromise;
} else {
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

export default clientPromise;