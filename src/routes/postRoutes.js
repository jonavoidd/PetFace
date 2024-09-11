const express = require("express");
const {
  createPost,
  likePost,
  commentOnPost,
} = require("../controllers/postController");

const router = express.Router();

router.post("/create", createPost);
router.post("/like", likePost);
router.post("/comment", commentOnPost);

module.exports = router;
