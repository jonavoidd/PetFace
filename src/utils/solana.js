const {
  Connection,
  PublicKey,
  clusterApiUrl,
  KeyPair,
  Transaction,
  sendAndConfirmTransaction,
} = require("@solana/web3.js");

const connection = new Connection(
  clusterApiUrl(process.env.SOLANA_CLUSTER),
  "confirmed"
);

const createNFT = async (ownerPublicKey, perData) => {
  const mintAccount = KeyPair.generate();

  return mintAccount.PublicKey.toBase58();
};

module.exports = { connection, createNFT };
