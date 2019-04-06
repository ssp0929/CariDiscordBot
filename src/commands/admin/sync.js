import * as LoadUsers from "../../utils/loadUsers";

module.exports = {
  async exec(msg) {
    LoadUsers.loadDiscordUsersIntoMongo(msg);
    msg.channel.send("Users successfully synced to MongoDB!");
  },
};
