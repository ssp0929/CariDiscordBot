import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  discordId: Number,
  discordName: String,
  dabCount: { type: Number, default: 0 },
});

const reportSchema = mongoose.Schema({
  discordId: Number,
  discordName: String,
  reportedBy: String,
  reason: String,
  timestamp: { type: Date, default: new Date() },
});

const Users = mongoose.model("users", userSchema);
const Reports = mongoose.model("reports", reportSchema);

export {
  Users,
  Reports,
};
