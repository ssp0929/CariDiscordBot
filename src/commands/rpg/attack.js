import Users from "../../models/mongo/schema";
import * as Randomizer from "../../utils/randomizer";

module.exports = {
  async exec(msg, victim) {
    if (!victim) {
      return msg.channel.send("You didn't specify who to attack!");
    }

    if (victim === msg.displayName || victim === msg.nickname) {
      return msg.channel.send("You can't attack yourself!");
    }

    const discordUser = await Users.find({ discordName: victim });
    
    if (discordUser.length) {
      const attackValue = Randomizer.generate(5);
      return msg.channel.send(`You attacked ${discordUser[0].discordName} for ${attackValue} hitpoints!`);
    }

    return msg.channel.send(`User ${victim} not found!`);
  },
};
