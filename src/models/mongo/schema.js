import mongoose from "mongoose";

const { Schema } = mongoose;

const userSchema = new Schema({
  discordId: String,
  discordName: String,
  dabCount: { type: Number, default: 0 },
});

const reportSchema = new Schema({
  discordId: String,
  discordName: String,
  reportedBy: String,
  reason: String,
  timestamp: { type: Date, default: new Date() },
});

const Users = mongoose.model("user", userSchema);
const Reports = mongoose.model("reports", reportSchema);

export {
  Users,
  Reports,
};
