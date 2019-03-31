import "dotenv/config";
import Discord from "discord.js";
import * as MessageHandler from "./handlers/messages";
import * as CommandHandler from "./handlers/commands";

// Initialize and login
const client = new Discord.Client();
client.login(process.env.TOKEN);

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on("message", (msg) => {
  const prefix = "!";

  if (msg.content.indexOf(prefix) === 0) {
    CommandHandler.onCommand(msg, prefix);
  } else {
    MessageHandler.onMessage(msg);
  }
});

client.on("guildMemberAdd", (member) => {
  const channel = member.guild.channels.find( (ch) => 
    ch.name === "general"
  );

  if (!channel) {
    return;
  }
  
  channel.send(`Welcome to the server, ${member}`);
});

