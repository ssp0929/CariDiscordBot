/* eslint-disable no-restricted-syntax */
/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import * as Winston from "winston";
import Users from "../models/mongo/schema";

module.exports = {
  loadDiscordUsersIntoMongo(msg) {
    for (const [key, value] of msg.guild.members) {
      if (value.user.bot === false) {
        Users.create({
          discordId: value.id,
          discordName: value.user.username.toLowerCase(),
        });
        Winston.log("info", `${value.user.username} loaded.`);
      } else {
        Winston.log("info", `${value.user.username} is a bot! Not loaded.`);
      }
    }
  },
};
