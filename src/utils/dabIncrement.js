import Users from "../models/mongo/schema";
import * as numberMoji from "../utils/numberMoji";

module.exports = {

    exec(dabber, msg) {
        Users.findOneAndUpdate(
            { discordName: dabber },
            { $inc: { dabCount: 1 } },
            { new: true },
            function (err, data) {
                if (data.dabCount % 100 === 0) {
                    msg.channel.send("***" + dabber + ":clap: JUST:clap: GOT:clap: TO:clap: " + data.dabCount + ":clap: DABS:clap: ***");
                } else if (data.dabCount % 50 === 0) {
                    msg.channel.send(":fire: **" + dabber + " just made it to " + data.dabCount + " dabs!!** :fire:");
                } else if (data.dabCount % 10 === 0) {
                    msg.channel.send("*Nice one!* " + dabber + " just hit " + data.dabCount + " dabs!");
                }
                if (err) {
                    console.log("oof! Error: " + err);
                }
                Users.aggregate(
                    [{ $match: { dabCount: { $gt: 0 } } }, { $group: { _id: null, total: { $sum: "$dabCount" } } }],
                    function (err, data) {
                        if (err) {
                            console.log("oof! Error: " + err);
                        } else {
                            if (data[0].total % 25 === 0) {
                                msg.channel.send("**S E R V E R   D A B S   J U S T   H I T**   "+numberMoji.exec(String(data[0].total)) );
                            }
                        }
                    }
                );
            }
        );
    }
};