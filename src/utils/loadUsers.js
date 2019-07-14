/* eslint-disable max-len */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import * as Winston from "winston";
import { Users, Reports } from "../models/mongo/schema";

const loadDiscordUsersIntoMongo = (msg) => {
  for (const [key, value] of msg.guild.members) {
    if (value.user.bot === false) {
      Users.create({
        discordId: value.id,
        discordName: value.nickname ? value.nickname.toLowerCase() : value.user.username.toLowerCase(), 
        dabCount: 0,
      });

      Winston.log("info", `${value.user.username} loaded.`);
    } else {
      Winston.log("info", `${value.user.username} is a bot! Not loaded.`);
    }
  }
};

const syncUserInMongo = (member) => {
  if (member.user.bot === false) { 
    Users.updateOne(
      { discordId: member.id }, 
      { $set: { discordName: member.nickname ? member.nickname.toLowerCase() : member.user.username.toLowerCase() } }, 
      { upsert: true, setDefaultsOnInsert: true }, 
      (err) => { if (err) console.log(err); },
    );

    Winston.log("info", `${member.nickname} synced.`);
  } else {
    Winston.log("info", `${member.nickname} is a bot! Not synced.`);
  }
};

export { 
  loadDiscordUsersIntoMongo,
  syncUserInMongo,
};
