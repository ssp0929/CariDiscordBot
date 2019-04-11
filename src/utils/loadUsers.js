/* eslint-disable no-restricted-syntax */
/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import * as Sentry from "@sentry/node";
import Users from "../models/mongo/schema";

module.exports = {
  loadDiscordUsersIntoMongo(msg) {
    for (const [key, value] of msg.guild.members) {
      if (value.user.bot === false) {
        Users.create({
          discordId: value.id,
          discordName: value.user.username.toLowerCase(),
        });
        Sentry.captureMessage(`${value.user.username} loaded.`);
      } else {
        Sentry.captureMessage(`${value.user.username} is a bot! Not loaded.`);
      }
    }
  },
};
