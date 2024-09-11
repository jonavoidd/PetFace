const mongoose = require("mongoose");

const nftSchema = new mongoose.Schema({
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  petID: String,
  blockchainID: String,
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("NFT", nftSchema);
