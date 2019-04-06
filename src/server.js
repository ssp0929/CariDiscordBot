import "dotenv/config";
import Discord from "discord.js";
import connectToDb from "./models/mongo/db";
import * as MessageHandler from "./handlers/messages";
import * as CommandHandler from "./handlers/commands";

// Initialize Mongo
connectToDb();

// Initialize and login
const client = new Discord.Client();
client.login(process.env.TOKEN);

client.on("ready", () => {
  // console.log(`Logged in as ${client.user.tag}!`);
});

client.on("message", (msg) => {
  const generalPrefix = "!";
  const rpgPrefix = "?";
  
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
