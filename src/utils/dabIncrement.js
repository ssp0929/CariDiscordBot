import * as Winston from "winston";
import * as numberMoji from "./numberMoji";
import { Users } from "../models/mongo/schema";

const exec = (dabber, msg) => {
  Users.findOneAndUpdate(
    { discordName: dabber },
    { $inc: { dabCount: 1 } },
    { new: true },
    (updateError, updateData) => {
      if (updateData.dabCount % 100 === 0) {
        msg.channel.send(`***${dabber}:clap: JUST:clap: GOT:clap: TO:clap: ${updateData.dabCount}:clap: DABS:clap: ***`);
      } else if (updateData.dabCount % 50 === 0) {
        msg.channel.send(`:fire: **${dabber} just made it to ${updateData.dabCount} dabs!!** :fire:`);
      } else if (updateData.dabCount % 10 === 0) {
        msg.channel.send(`*Nice one!* ${dabber} just hit ${updateData.dabCount} dabs!`);
      }
      if (updateError) {
        Winston.log("error", updateError);
      }
      Users.aggregate(
        [{ $match: { dabCount: { $gt: 0 } } }, { $group: { _id: null, total: { $sum: "$dabCount" } } }],
        (aggError, aggData) => {
          if (aggError) {
            Winston.log("error", aggError);
          } else if (aggData[0].total % 25 === 0) {
            msg.channel.send(`**S E R V E R   D A B S   J U S T   H I T**   ${numberMoji.exec(String(aggData[0].total))}`);
          }
        },
      );
    },
  );
};

export default exec;
