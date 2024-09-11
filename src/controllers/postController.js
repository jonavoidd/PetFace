const Post = require("../models/Post");
const User = require("../models/User");

exports.createPost = async (req, res) => {
  const { userID, content, imageUrl, videoUrl } = req.body;

  try {
    const newPost = new Post({ user: userID, content, imageUrl, videoUrl });
    await newPost.save();
    res.status(201).json({ message: "Post successful" });
  } catch (error) {
    res.status(500).json({ error: "Post failed" });
  }
};

exports.likePost = async (req, res) => {
  const { userID, postID } = req.body;

  try {
    const post = await Post.findById(postID);

    if (!post.likes.includes(userID)) {
      post.likes.push(userID);
      await post.save();
    }

    res.json({ message: "Like success" });
  } catch (error) {
    res.status(500).json({ error: "Failed to like post" });
  }
};

exports.commentOnPost = async (req, res) => {
  const { userID, postID, content } = req.body;

  try {
    const post = await Post.findById(postID);
    post.comments.push({ user: userID, content, createdAt: new Date() });
    await post.save();

    res.json({ message: "Comment added successfully" });
  } catch (error) {
    res.status(500).json({ error: "Comment failed" });
  }
};
