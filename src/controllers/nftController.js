const { createNFT } = require("../utils/solana");
const NFT = require("../models/NFT");
const User = require("../models/User");

exports.mintNFT = async (req, res) => {
  const { userID, petID } = req.body;

  try {
    const user = await User.findById(userID);

    if (!user) return res.status(404).json({ error: "User not found" });

    const nftID = await createNFT(user.publicKey, { petID });

    const newNFT = new NFT({ owner: userID, petID, blockchainID: nftID });
    await newNFT.save();

    res.status(200).json({ message: "NFT minted successfully", nftID });
  } catch (error) {
    res.status(500).json({ error: "NFT failed to mint" });
  }
};
