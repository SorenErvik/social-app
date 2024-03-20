import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';

let mongoMemoryServer: MongoMemoryServer;

beforeAll(async () => {
  mongoMemoryServer = await MongoMemoryServer.create(); // Use create() instead of new()
  const mongoUri = mongoMemoryServer.getUri();
  await mongoose.connect(mongoUri, {
    useUnifiedTopology: true
  } as any);
});

// Before each test
// Clean up the database
beforeEach(async () => {
  const allCollections = await mongoose.connection.db.collections();

  for (let collection of allCollections) {
    await collection.deleteMany({});
  }
});

afterAll(async () => {
  await mongoMemoryServer.stop();
  await mongoose.connection.close();
});
// After all tests
// Close the connection with the database
