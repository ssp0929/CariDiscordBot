import Users from "../../models/mongo/schema";

module.exports = {
  async exec(msg) {
    const discordUser = await Users.find({ discordName: msg.author.username.toLowerCase() });
    
    if (discordUser.length) {
      return msg.channel.send(`${discordUser[0]}`);
    }

    return msg.channel.send("Profile not found!");
  },
};
