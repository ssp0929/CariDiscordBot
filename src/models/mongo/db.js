import "dotenv/config";
import * as Winston from "winston";
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
    Winston.info("Connected to MongoDB");
  } catch (err) {
    Winston.error(err);
  }
};

export default connectToDb;
