import * as LoadUsers from "../../utils/loadUsers";

const exec = async(msg) => {
  LoadUsers.loadDiscordUsersIntoMongo(msg);
  msg.channel.send("Users successfully synced to MongoDB!");
};

export default exec;