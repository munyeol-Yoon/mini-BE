const express = require("express");

const {
  createPost,
  findAllPosts,
  findPost,
  updatePost,
  deletePost,
} = require("../controllers/posts.controller");

const authMiddleware = require("../middleware/auth-middleware");
const upload = require("../multer/awsMulterModules");

const router = express.Router();

router.post("/", authMiddleware, upload.single("imgFile"), createPost);
router.get("/", findAllPosts);
router.get("/:postId", findPost);
router.put("/:postId", authMiddleware, updatePost);
router.delete("/:postId", authMiddleware, deletePost);

module.exports = router;
