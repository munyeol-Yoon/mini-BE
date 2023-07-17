const express = require("express");

const {
  createPost,
  findAllPosts,
  findPost,
  updatePost,
  deletePost,
} = require("../controllers/posts.controller");

const router = express.Router();

router.post("/", createPost);
router.get("/", findAllPosts);
router.get("/:postId", findPost);
router.put("/:postId", updatePost);
router.delete("/:postId", deletePost);

module.exports = router;
