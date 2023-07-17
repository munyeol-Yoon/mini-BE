const express = require("express");

const authMiddleware = require("../middleware/auth-middleware");

const {
  createPost,
  findAllPosts,
  findPost,
  updatePost,
  deletePost,
} = require("../controllers/posts.controller");

const router = express.Router();

router.post("/", authMiddleware, createPost);
router.get("/", findAllPosts);
router.get("/:postId", findPost);
router.put("/:postId", authMiddleware, updatePost);
router.delete("/:postId", authMiddleware, deletePost);

module.exports = router;
