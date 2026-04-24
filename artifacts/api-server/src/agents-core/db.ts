import { MongoClient, Db } from 'mongodb';
import { MongoMemoryServer } from 'mongodb-memory-server';
import config from './config';

let db: Db | null = null;
let client: MongoClient | null = null;
let memServer: MongoMemoryServer | null = null;

export async function connect(): Promise<Db> {
  if (db) return db;
  try {
    let uri = config.mongoUri;

    // Try connecting to local MongoDB first
    try {
      const testClient = new MongoClient(uri, {
        serverSelectionTimeoutMS: 3000,
        connectTimeoutMS: 3000
      });
      await testClient.connect();
      await testClient.db().admin().ping();
      await testClient.close();
      console.log('[DB] Local MongoDB available');
    } catch (localErr) {
      // Local MongoDB not available — use in-memory
      console.log('[DB] Local MongoDB not available — starting in-memory MongoDB...');
      memServer = await MongoMemoryServer.create();
      uri = memServer.getUri();
      console.log('[DB] In-memory MongoDB started at:', uri);
    }

    client = new MongoClient(uri);
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
