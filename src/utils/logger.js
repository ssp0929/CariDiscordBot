import "dotenv/config";
import * as Winston from "winston";
import { Loggly, flushLogsAndExit } from "winston-loggly-bulk";

// Initialize Winston Logger to transport logs to Loggly
const initLogger = async () => {
  Winston.add(new Loggly({
    token: process.env.LOGGLY_TOKEN,
    subdomain: "stephenpark",
    tags: ["Winston-NodeJS"],
    json: true,
  }));
  
  Winston.add(new Winston.transports.Console());
  
  // Handle uncaught exceptions
  process.on("uncaughtException", (err) => {
    Winston.error(err.stack);
    flushLogsAndExit();
  });
};

export default initLogger;
