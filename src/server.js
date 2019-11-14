import "dotenv/config";
import Client from "./classes/Client";
import initLogger from "./utils/logger";
import connectToDb from "./models/mongo/db";

(async () => {
  // Initialize Logger
  await initLogger();

  // Initialize Mongo
  await connectToDb();

  // Initialize and login
  const client = new Client();
  client.listen();
})();
