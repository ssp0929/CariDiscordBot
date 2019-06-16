import { Users } from "../../models/mongo/schema";

const buildProfileString = discordUser => `
\`\`\`
${discordUser[0].discordName}'s profile
====================
Economy:
:: Call Box Coins - ${discordUser[0].economy.wealth}
RPG:
:: Health - ${discordUser[0].rpg.health}
:: Exp - ${discordUser[0].rpg.exp}
:: Level - ${discordUser[0].rpg.level}
Misc:
:: Dabcount - ${discordUser[0].dabCount}
\`\`\`
  `;

const exec = async (msg) => {
  const discordUser = await Users.find({ discordName: msg.author.username.toLowerCase() });
    
  if (discordUser.length) {
    const profileString = buildProfileString(discordUser);
    return msg.channel.send(profileString);
  }

  return msg.channel.send("Profile not found!");
};

export { 
  exec,
};
