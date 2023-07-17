const express = require("express");

const postsRouter = require("./posts");
const registerRouter = require("./register");

const router = express.Router();

router.use("/posts", postsRouter);
router.use("/register", registerRouter);

module.exports = router;
