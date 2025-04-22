import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";

declare global {
  var signin: (id?: string) => string[];
}
jest.mock("../nats-wrapper");

process.env.STRIPE_KEY = "sk_test_hnfrAm8rOkryFEnV23jjfFlw";

let mongo: any;
beforeAll(async () => {
  process.env.JWT_KEY = "test_jwt_secret";
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
  mongo = await MongoMemoryServer.create();
  const mongoUri = mongo.getUri();
  await mongoose.connect(mongoUri, {});
});

beforeEach(async () => {
  if (mongoose.connection.db) {
    const collections = await mongoose.connection.db.collections();

    for (let collection of collections) {
      await collection.deleteMany({});
    }
  }
});

afterAll(async () => {
  if (mongo) {
    await mongo.stop();
  }
  await mongoose.connection.close();
});

global.signin = (id?: string) => {
  //built a JWT payload
  const payload = {
    id: id || new mongoose.Types.ObjectId().toHexString(),
    email: "test@test.com",
  };
  //create JWT
  const token = jwt.sign(payload, process.env.JWT_KEY!);

  //build session object
  const session = { jwt: token };

  //turn session into json
  const sessionJSON = JSON.stringify(session);

  //take json and encode it to base64
  const base64 = Buffer.from(sessionJSON).toString("base64");
  //return a string thats the cookie with encoded data
  return [`session=${base64}`];
};
