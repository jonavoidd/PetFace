const express = require("express");
const {
  Connection,
  PublicKey,
  clusterApiUrl,
  KeyPair,
} = require("@solana/web3.js");
const bodyparser = require("body-parser");
const dotenv = require("dotenv");
const { MongoClient } = require("mongodb");

dotenv.config();

const app = express();
app.use(bodyparser.json());

const connection = new Connection(clusterApiUrl("devnet"), "confirmed");
const client = new MongoClient(process.env.MONGODB_URI);

const connectToDB = async () => {
  try {
    await client.connect();
    console.log("Connected to database");
  } catch (error) {
    console.error("Failed to connect to the database:", error);
  }
};

connectToDB();

app.post("/api/createProfile", async (req, res) => {
  const { username, petName, breed, age, bio, publicKey } = req.body;

  try {
    const db = client.db("PetSocialApp");
    const usersCollection = db.collection("Users");

    const userProfile = {
      username,
      petName,
      breed,
      age,
      bio,
      publicKey,
      createdAt: new Date(),
    };

    await usersCollection.insertOne(userProfile);
    res.status(201).json({ message: "Profile successfully created" });
  } catch (error) {
    res.status(500).json({ error: "Failed to create profile" });
  }
});

app.post("/api/createPost", async (req, res) => {
  const { username, content, imageUrl, videoUrl } = req.body;

  try {
    const db = client.db("PetSocialApp");
    const postCollection = db.collection("Posts");

    const post = {
      username,
      content,
      imageUrl,
      videoUrl,
      createdAt: new Date(),
    };

    await postCollection.insertOne(post);
    res.status(201).json({ message: "Post successful" });
  } catch (error) {}
  res.status(500).json({ error: "Post unsuccessful" });
});

app.post("/api/mintNFT", async (req, res) => {
  const { publicKey, petData } = req.body;

  try {
    const owner = new PublicKey(publicKey);
    const mintAccount = KeyPair.generate();

    res.status(201).json({
      message: "NFT minted successfully",
      mintAccount: mintAccount.PublicKey.toBase58(),
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to mint NFT" });
  }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
