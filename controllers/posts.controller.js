const { Posts } = require("../models");
const {
  postSchema,
  updatePostschema,
} = require("../validations/posts-validation");

const createPost = async (req, res) => {
  try {
    const { title, content, name, imgsrc } = await postSchema.validateAsync(
      req.body
    );

    //! create 시에 userId 를 같이 넣어주세요.
    const savedPost = await Posts.create({ title, content, name, imgsrc });
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
    const { title, content, imgsrc } = await updatePostschema.validateAsync(
      req.body
    );
    const post = await Posts.findOne({ where: { postId } });

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

    //! update 시에 userId 를 같이 넣어주세요
    // update title and content
    const updatePost = await post.update({
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
    const post = await Posts.findOne({ where: { postId } });

    if (!post) {
      return res
        .status(400)
        .json({ errorMessage: "게시글을 찾을 수 없습니다." });
    }

    //! destroy 시에 postId, 와 userId 가 같은 경우만 지워주세요
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
