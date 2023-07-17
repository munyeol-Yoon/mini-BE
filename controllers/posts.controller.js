const { Posts, Users } = require("../models");
const {
  postSchema,
  updatePostschema,
} = require("../validations/posts-validation");

const createPost = async (req, res) => {
  try {
    const { title, content, imgsrc } = await postSchema.validateAsync(req.body);

    const { userId } = res.locals.user;
    console.log(userId);

    const existUser = await Users.findOne({ where: { userId } });

    if (!existUser) {
      return res
        .status(404)
        .json({ errorMessage: "해당 유저가 존재하지 않습니다. " });
    }

    const savedPost = await Posts.create({
      userId,
      title,
      content,
      name: existUser.name,
      imgsrc,
    });
    return res.status(201).json({ message: "게시글을 생성하였습니다." });
  } catch (error) {
    console.log(error);
    if (error.isJoi) {
      return res.status(412).json({ errorMessage: error.message });
    }
    return res
      .status(400)
      .json({ errorMessage: "게시글 생성에 실패하였습니다. " });
  }
};

const findAllPosts = async (_, res) => {
  try {
    const data = await Posts.findAll({ order: [["createdAt", "DESC"]] });
    return res.status(200).json({ data });
  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .json({ errorMessage: "게시글 조회에 실패하였습니다." });
  }
};

const findPost = async (req, res) => {
  try {
    const { postId } = req.params;
    const post = await Posts.findOne({ where: { postId } });

    if (!post) {
      return res
        .status(400)
        .json({ errorMessage: "게시글을 찾을 수 없습니다." });
    }

    return res.status(200).json({ data: post });
  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .json({ errorMessage: "게시글 조회에 실패하였습니다." });
  }
};

const updatePost = async (req, res) => {
  try {
    const { postId } = req.params;
    const { userId } = res.locals.user;
    const { title, content, imgsrc } = await updatePostschema.validateAsync(
      req.body
    );
    const post = await Posts.findOne({ where: { postId, userId } });

    // post matching
    if (!post) {
      return res
        .status(404)
        .json({ errorMessage: "게시글을 찾을 수 없습니다." });
    }

    if (!title || !content) {
      return res
        .status(400)
        .json({ errorMessage: "내용이 존재하지 않습니다." });
    }

    // update title and content
    const updatePost = await post.update({
      userId,
      title,
      content,
      imgsrc,
      updatedAt: Date.now(),
    });
    if (!updatePost) {
      return res
        .status(400)
        .json({ errorMessage: "게시글 수정에 실패 하였습니다." });
    }
    return res.status(200).json({ message: "게시글을 수정하였습니다." });
  } catch (error) {
    console.log(error);
    if (error.isJoi) {
      return res.status(412).json({ errorMessage: error.message });
    }
    return res
      .status(400)
      .json({ errorMessage: "게시글이 존재하지 않습니다." });
  }
};

const deletePost = async (req, res) => {
  try {
    const { postId } = req.params;
    const { userId } = res.locals.user;
    const post = await Posts.findOne({ where: { postId, userId } });

    if (!post) {
      return res
        .status(400)
        .json({ errorMessage: "게시글을 찾을 수 없습니다." });
    }

    const deletePost = await post.destroy();
    if (!deletePost) {
      return res
        .status(400)
        .json({ errorMessage: "게시글 삭제에 실패 하였습니다." });
    }

    return res.json({ message: "게시글을 삭제하였습니다." });
  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .json({ errorMessage: "게시글이 존재하지 않습니다." });
  }
};

module.exports = {
  createPost,
  findAllPosts,
  findPost,
  updatePost,
  deletePost,
};
