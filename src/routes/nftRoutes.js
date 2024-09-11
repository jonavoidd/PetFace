const express = require("express");
const { mintNFT } = require("../controllers/nftController");

const router = express.Router();

app.router("/mint", mintNFT);

module.exports = router;
