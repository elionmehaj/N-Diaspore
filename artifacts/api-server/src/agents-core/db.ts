import { MongoClient, Db } from 'mongodb';
import { MongoMemoryServer } from 'mongodb-memory-server';
import config from './config.js';

let db: Db | null = null;
let client: MongoClient | null = null;
let memServer: MongoMemoryServer | null = null;
let connectionPromise: Promise<Db> | null = null;

const mongoOptions = {
  serverSelectionTimeoutMS: 5000,
  connectTimeoutMS: 5000,
};

export async function connect(): Promise<Db> {
  if (db) return db;
  if (connectionPromise) return connectionPromise;

  connectionPromise = connectInternal().catch((err) => {
    connectionPromise = null;
    throw err;
  });

  return connectionPromise;
}

async function connectInternal(): Promise<Db> {
  try {
    const hasMongoUri = Boolean(process.env.MONGODB_URI);
    let uri = config.mongoUri;

    if (process.env.VERCEL && !hasMongoUri) {
      throw new Error('MONGODB_URI environment variable is required on Vercel.');
    }

    // Local development can fall back to an in-memory MongoDB. Vercel cannot.
    if (!hasMongoUri) {
      const testClient = new MongoClient(uri, {
        serverSelectionTimeoutMS: 3000,
        connectTimeoutMS: 3000
      });

      try {
        await testClient.connect();
        await testClient.db().admin().ping();
        await testClient.close();
        console.log('[DB] Local MongoDB available');
      } catch (localErr) {
        console.log('[DB] Local MongoDB not available — starting in-memory MongoDB...');
        memServer = await MongoMemoryServer.create();
        uri = memServer.getUri();
        console.log('[DB] In-memory MongoDB started at:', uri);
      }
    }

    client = new MongoClient(uri, mongoOptions);
    await client.connect();
    db = client.db('kahkosova');
    console.log('[DB] Connected to MongoDB');

    // Create indexes for performance
    await db.collection('trips').createIndex({ type: 1, origin: 1, destination: 1 });
    await db.collection('trips').createIndex({ category_tag: 1 });
    await db.collection('trips').createIndex({ price: 1 });
    await db.collection('trips').createIndex({ departure_time: 1 });
    await db.collection('trips').createIndex({ createdAt: -1 });

    return db;
  } catch (err) {
    if (err instanceof Error) {
      console.error('[DB] Connection failed:', err.message);
    }
    throw err;
  }
}

export function getDb(): Db {
  if (!db) throw new Error('Database not connected. Call connect() first.');
  return db;
}

export async function close() {
  if (client) {
    await client.close();
    db = null;
    client = null;
    console.log('[DB] Connection closed');
  }
  if (memServer) {
    await memServer.stop();
    memServer = null;
    console.log('[DB] In-memory server stopped');
  }
}
