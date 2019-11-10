import "dotenv/config";
import Discord from "discord.js";
import * as Winston from "winston";
import { Loggly, flushLogsAndExit } from "winston-loggly-bulk";
import connectToDb from "./models/mongo/db";
import * as MessageHandler from "./handlers/messages";
import * as CommandHandler from "./handlers/commands";
import * as LoadUsers from "./utils/loadUsers";

// Initialize Winston Logger to transport logs to Loggly
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

// Initialize Mongo
connectToDb();

// Initialize and login
const client = new Discord.Client();
client.login(process.env.TOKEN);

client.on("ready", () => {
  Winston.info(`Logged in as ${client.user.tag}!`);
});

client.on("message", (msg) => {
  const generalPrefix = "!";

  // Ignore triggering off of bot messages
  if (msg.author.bot) { return; }
  
  if (msg.content.indexOf(generalPrefix) === 0) {
    CommandHandler.onCommand(msg, generalPrefix);
  } else {
    MessageHandler.onMessage(msg);
  }
});

client.on("guildMemberAdd", (member) => {
  const channel = member.guild.channels.find((ch) => ch.name === "general");
  LoadUsers.syncUserInMongo(member);

  if (!channel) {
    return;
  }

  channel.send(`Welcome to the server, ${member}`);
});

client.on("guildMemberUpdate", (oldMember, newMember) => {
  LoadUsers.syncUserInMongo(newMember);
});
