import { Users } from "../../models/mongo/schema";
import * as Randomizer from "../../utils/randomizer";

const attackUser = async (msg, victim, attackValue, currentHealth) => {
  const netHealth = currentHealth - attackValue;
  if (netHealth <= 0) {
    await Users.findOneAndUpdate({ discordName: victim }, {
      "rpg.health": 100,
    });
    msg.channel.send(`${victim} has been killed!`);
  } else {
    await Users.findOneAndUpdate({ discordName: victim }, {
      "rpg.health": netHealth,
    });
  }
};

const exec = async(msg, victim) => {
  if (!victim) {
    return msg.channel.send("You didn't specify who to attack!");
  }

  if (victim === msg.displayName || victim === msg.nickname) {
    return msg.channel.send("You can't attack yourself!");
  }

  const discordUser = await Users.find({ discordName: victim });
  
  if (discordUser.length) {
    const attackValue = Randomizer.generate(5);
    const currentHealth = discordUser[0].rpg.health;
    attackUser(msg, victim, attackValue, currentHealth);
    return msg.channel.send(`You attacked ${discordUser[0].discordName} for ${attackValue} hitpoints!`);
  }

  return msg.channel.send(`User ${victim} not found!`);
}

export default exec;
