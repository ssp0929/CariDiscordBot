import "dotenv/config";
import Discord from "discord.js";
import * as Winston from "winston";
import { Loggly } from "winston-loggly-bulk";
import connectToDb from "./models/mongo/db";
import * as MessageHandler from "./handlers/messages";
import * as CommandHandler from "./handlers/commands";

// Initialize Winston Logger to transport logs to Loggly
Winston.add(new Loggly({
  token: "cf22d076-08ff-4c02-8197-e488a5e8d406",
  subdomain: "stephenpark",
  tags: ["Winston-NodeJS"],
  json: true,
}));

// Initialize Mongo
connectToDb();

// Initialize and login
const client = new Discord.Client();
client.login(process.env.TOKEN);

client.on("ready", () => {
  Winston.log("info", `Logged in as ${client.user.tag}!`);
});

client.on("message", (msg) => {
  const generalPrefix = "!";
  const rpgPrefix = "?";

  // Ignore triggering off of bot messages
  if (msg.author.bot) { return; }
  
  if (msg.content.indexOf(generalPrefix) === 0) {
    CommandHandler.onCommand(msg, generalPrefix);
  } else if (msg.content.indexOf(rpgPrefix) === 0) {
    CommandHandler.onCommand(msg, rpgPrefix);
  } else {
    MessageHandler.onMessage(msg);
  }
});

client.on("guildMemberAdd", (member) => {
  const channel = member.guild.channels.find(ch => ch.name === "general");

  if (!channel) {
    return;
  }

  channel.send(`Welcome to the server, ${member}`);
});
