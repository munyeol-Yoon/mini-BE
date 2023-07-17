const { Posts } = require("../models");

const createPost = async (req, res) => {
  try {
    const { title, content, name } = req.body;
    const savedPost = await Posts.create({ title, content, name });
    res.status(201).json({ message: "게시글을 생성하였습니다." });
  } catch (error) {
    console.log(error);
    res.status(400).json({ errorMessage: error.message });
  }
};

const findAllPosts = async (req, res) => {
  try {
    const data = await Posts.findAll({ order: [["createdAt", "DESC"]] });
    res.json({ data });
  } catch (error) {
    console.log(error);
    res.status(400).json({ errormessage: "게시글 조회에 실패하였습니다." });
  }
};

const findPost = async (req, res) => {
  try {
    const post = await Posts.findOne({ where: { id: req.params.id } });

    if (!post) {
      return res
        .status(400)
        .json({ errorMessage: "게시글을 찾을 수 없습니다." });
    }

    res, json({ post });
  } catch (error) {
    console.log(error);
    res.status(400).json({ errorMessage: error.message });
  }
};

const updatePost = async (req, res) => {
  try {
    const { title, content } = req.body;
    const post = await Posts.findOne({ where: { id: req.params.id } });

    // post matching
    if (!post) {
      return res
        .status(400)
        .json({ errorMessage: "게시글을 찾을 수 없습니다." });
    }

    // original author matching
    if (post.name !== req.user.name) {
      return res
        .status(403)
        .json({ errorMessage: "작성자만 게시글을 수정할 수 있습니다." });
    }

    // update title and content
    await post.update({ title, content });
    res.json({ message: "게시글을 수정하였습니다." });
  } catch (error) {
    console.log(error);
    res.status(400).json({ errorMessage: "게시글이 존재하지 않습니다." });
  }
};

const deletePost = async (req, res) => {
  try {
    const post = await Posts.findOne({ where: { id: req.params.id } });

    if (!post) {
      return res
        .status(400)
        .json({ errorMessage: "게시글을 찾을 수 없습니다." });
    }

    await post.destroy();

    res.json({ message: "게시글을 삭제하였습니다." });
  } catch (error) {
    console.log(error);
    res.status(400).json({ errorMessage: "게시글이 존재하지 않습니다." });
  }
};

module.exports = {
  createPost,
  findAllPosts,
  findPost,
  updatePost,
  deletePost,
};
