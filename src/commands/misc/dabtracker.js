import { Users } from "../../models/mongo/schema";

module.exports = {
  async exec(msg) {
    const discordUser = await Users.find({ discordName: msg.author.username.toLowerCase() });
    
    if (discordUser.length) {
      if (discordUser[0].dabCount === 1) {
        return msg.channel.send(`You are at ${discordUser[0].dabCount} dab!`);
      }
      return msg.channel.send(`You are at ${discordUser[0].dabCount} dabs!`);
    }
    return msg.channel.send("Profile not found!");
  },
};
