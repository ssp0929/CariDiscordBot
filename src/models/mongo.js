import "dotenv/config";
import mongoose from "mongoose";

const Schema = mongoose.Schema;
const username = process.env.MONGO_USER;
const password = process.env.MONGO_PASS;
const host = "stephensptestcluster-llzak.mongodb.net";
const db = "cari";
const connectionString = `mongodb+srv://${username}:${password}@${host}/${db}?retryWrites=true`;
mongoose.connect(connectionString, { useNewUrlParser: true, autoIndex: false });

mongoose.connection.on("connected", function () {
  console.log("MongoDB connected");
});

mongoose.connection.on("error",function (err) {
  console.log("MongoDB error detected" + err);
});

mongoose.connection.on("disconnected", function () {
  console.log("MongoDB connection terminated");
});

process.on("SIGINT", function() {
  mongoose.connection.close(function () {
    console.log("Mongoose default connection closed through app termination");
    process.exit(0);
  });
});

const userSchema = new Schema({
  discordId: Number,
  currency: Number
})

const User = mongoose.model("users", userSchema);

User.find({}, (err, users) => {
  console.log(users);
});

module.exports = {
  User
}