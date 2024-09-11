const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  pets: [
    { name: String, breed: String, age: Number, bio: String, nftID: String },
  ],
  followers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  following: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  reputation: { type: Number, default: 0 },
  publicKey: { type: String, required: true },
});

module.exports = mongoose.model("User", userSchema);
