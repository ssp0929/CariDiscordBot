/* eslint-disable consistent-return */
/* eslint-disable max-len */
import Discord from "discord.js";
import { Users, Reports } from "../../models/mongo/schema";

const exec = async (msg, offender) => {
  const discordUser = await Users.find({ discordName: offender });
    
  if (discordUser.length) {
    msg.reply("What is the reason for your report? (You have 30 seconds to reply)");

    const collector = new Discord.MessageCollector(msg.channel, m => m.author.id === msg.author.id, { time: 30000 });
    let reasonResponse;
    collector.on("collect", (response) => {
      reasonResponse = response.content;
      Reports.create({
        discordId: discordUser[0].discordId,
        discordName: discordUser[0].discordName,
        reportedBy: msg.author.username,
        reason: reasonResponse,
      });

      collector.stop();
    });

    collector.on("end", () => {
      if (reasonResponse) {
        return msg.channel.send(`${offender} reported for ${reasonResponse}`);
      } 
      return msg.channel.send("Didn't reply with a reason in time allotted");
    });
  } else {
    return msg.channel.send("User not found!");
  }
};

export { 
  exec,
};
