import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  discordId: Number,
  discordName: String,
  dabCount: { type: Number, default: 0 },
  economy: { 
    wealth: { type: Number, default: 0 },
    dropModifier: { type: Number, default: 0 },
    coinModifier: { type: Number, default: 0 },
    inventory: { type: Array, default: [] },
  },
  rpg: {  
    health: { type: Number, default: 100 },
    exp: { type: Number, default: 0 },
    level: { type: Number, default: 0 },
    inventory: {
      weapon: { type: String, default: null },
      armor: { type: String, default: null },
      accessory: { type: String, default: null },
      inventory: { type: Array, default: [] },
    },
  },
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
