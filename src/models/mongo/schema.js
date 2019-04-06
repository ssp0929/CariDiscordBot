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

const Users = mongoose.model("users", userSchema);

export default Users;
