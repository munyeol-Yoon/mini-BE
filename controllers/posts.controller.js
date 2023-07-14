const { Posts } = require('../models');

const createPost = async (req, res) => {
  try {

    const { title, content, name } = req.body;
    const savedPost = await Posts.create({ title, content, name });
    res.status(201).json({ message: "게시글을 생성하였습니다." });
  } catch (error) {
    console.log(error);
    res.status(400).json({ errormessage: "게시글 생성에 실패하였습니다." });
  }
};

const findAllPosts = async (req, res) => {
  try {
    const data = await Posts.findAll({ order: [["createdAt", "DESC"]] });
    res.json({ data });
  } catch (error) {
    console.log(error);
    res.status(400).json({ errormessage: "게시글 조회에 실패하였습니다." });
  }};


const findPost = async (req, res) => {
  return res.send("게시글 상세 조회");
};

const updatePost = async (req, res) => {
  return res.send("게시글 수정");
};

const deletePost = async (req, res) => {
  return res.send("게시글 삭제");
};

module.exports = {
  createPost,
  findAllPosts,
  findPost,
  updatePost,
  deletePost,
};
