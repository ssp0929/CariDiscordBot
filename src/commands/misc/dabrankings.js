import * as Sentry from "@sentry/node";
import Users from "../../models/mongo/schema";

module.exports = {
  async exec(msg) {
    let total = await Users.aggregate(
      [{ $match: { dabCount: { $gt: 0 } } }, { $group: { _id: null, total: { $sum: "$dabCount" } } }],
      (err, data) => {
        if (err) {
          Sentry.captureException(err);
        } else {
          total = data;
        }
      },
    );
    const discordUser = await Users.find({ dabCount: { $gt: 0 } }).sort({ dabCount: -1 }).limit(10);
    let rankings = `\`\`\`Total dabs performed: ${total[0].total}\n\nTop ${discordUser.length} dabbers:\n DABS | NAME `;
    for (const user of discordUser) {
      if (user.dabCount < 10) {
        rankings += `\n    ${user.dabCount} | ${user.discordName}`;
      } else if (user.dabCount < 100) {
        rankings += `\n   ${user.dabCount} | ${user.discordName}`;
      } else if (user.dabCount < 1000) {
        rankings += `\n  ${user.dabCount} | ${user.discordName}`;
      } else if (user.dabCount < 10000) {
        rankings += `\n ${user.dabCount} | ${user.discordName}`;
      } else {
        rankings += `\n${user.dabCount} | ${user.discordName}`;
      }
    }
    rankings += "\n```";

    return msg.channel.send(rankings);
  },
};
