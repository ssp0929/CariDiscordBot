/* eslint-disable no-console */
import "dotenv/config";
import mongoose from "mongoose";

mongoose.Promise = global.Promise;

const connectToDb = async () => {
  const username = process.env.MONGO_USER;
  const password = process.env.MONGO_PASS;
  const host = "stephensptestcluster-llzak.mongodb.net";
  const database = "cari";
  const connectionString = `mongodb+srv://${username}:${password}@${host}/${database}?retryWrites=true`;
  try {
    await mongoose.connect(connectionString, { useNewUrlParser: true, autoIndex: false });
    console.log("Connected to MongoDB");
  } catch (err) {
    console.error("Could not connect to MongoDB");
  }
};

export default connectToDb;