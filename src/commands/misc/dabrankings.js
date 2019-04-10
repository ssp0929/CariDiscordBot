import Users from "../../models/mongo/schema";

module.exports = {
  async exec(msg) {
    var total = await Users.aggregate(
        [{ $match: { dabCount: { $gt: 0 }}}, { $group: { _id: null, total: { $sum: "$dabCount" }}}],
        function (err, data) {
            if (err) {
                console.log("oof! Error: "+err);
            } else {
                total = data;
            }
        }
    );
    const discordUser = await Users.find({ dabCount: { $gt: 0 } }).sort({ dabCount: -1 }).limit(10);
    var rankings = "```Total dabs performed: "+total[0].total+"\n\nTop "+discordUser.length+" dabbers:\n DABS | NAME ";
    for (var user of discordUser) {
        if (user.dabCount < 10) {
            rankings = rankings+"\n    "+user.dabCount+" | "+user.discordName
        } else if (user.dabCount < 100) {
            rankings = rankings+"\n   "+user.dabCount+" | "+user.discordName
        } else if (user.dabCount < 1000) {
            rankings = rankings+"\n  "+user.dabCount+" | "+user.discordName
        } else if (user.dabCount < 10000) {
            rankings = rankings+"\n "+user.dabCount+" | "+user.discordName
        } else {
            rankings = rankings+"\n"+user.dabCount+" | "+user.discordName
        }
    }
    rankings = rankings+"\n```"

    return msg.channel.send(rankings);
  },
};