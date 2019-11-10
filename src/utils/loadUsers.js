/* eslint-disable max-len */
import * as Winston from "winston";
import { Users } from "../models/mongo/schema";

const loadDiscordUsersIntoMongo = (msg) => {
  // eslint-disable-next-line no-unused-vars
  for (const [key, value] of msg.guild.members) {
    if (value.user.bot === false) {
      Users.create({
        discordId: value.id,
        discordName: value.nickname ? value.nickname.toLowerCase() : value.user.username.toLowerCase(), 
        dabCount: 0,
      });

      Winston.info(`${value.user.username} loaded.`);
    } else {
      Winston.info(`${value.user.username} is a bot! Not loaded.`);
    }
  }
};

const syncUserInMongo = (member) => {
  if (member.user.bot === false) { 
    Users.updateOne(
      { discordId: member.id }, 
      { $set: { discordName: member.nickname ? member.nickname.toLowerCase() : member.user.username.toLowerCase() } }, 
      { upsert: true, setDefaultsOnInsert: true }, 
      (err) => { if (err) Winston.log(err); },
    );

    Winston.info(`${member.nickname} synced.`);
  } else {
    Winston.info(`${member.nickname} is a bot! Not synced.`);
  }
};

export { 
  loadDiscordUsersIntoMongo,
  syncUserInMongo,
};
