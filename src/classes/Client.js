import "dotenv/config";
import Discord from "discord.js";
import Winston from "winston";
import * as MessageHandler from "../handlers/messages";
import * as CommandHandler from "../handlers/commands";
import * as LoadUsers from "../utils/loadUsers";

class Client extends Discord.Client {
  constructor() {
    super();

    this.login(process.env.TOKEN);
  }

  listen() {
    this.on("ready", () => {
      Winston.info(`Logged in as ${this.user.tag}!`);
    });

    this.on("message", (msg) => {
      const generalPrefix = "!";
    
      // Special case to handle OldMan bot encroaching on Cari's turf
      // Also Andad
      if (msg.author.id === "638572127611518995" || msg.author.id === "198881445996003328") {
        if (Math.floor(Math.random() * 1000) >= 900) {
          msg.channel.send("Ok, boomer");
        }
      }
    
      // Ignore triggering off of bot messages
      if (msg.author.bot) { return; }
      
      if (msg.content.indexOf(generalPrefix) === 0) {
        CommandHandler.onCommand(msg, generalPrefix);
      } else {
        MessageHandler.onMessage(msg);
      }
    });

    this.on("guildMemberAdd", (member) => {
      const channel = member.guild.channels.find((ch) => ch.name === "general");
      LoadUsers.syncUserInMongo(member);
    
      if (!channel) {
        return;
      }
    
      channel.send(`Welcome to the server, ${member}`);
    });
    
    this.on("guildMemberUpdate", (oldMember, newMember) => {
      LoadUsers.syncUserInMongo(newMember);
    });
  }
}

export default Client;
