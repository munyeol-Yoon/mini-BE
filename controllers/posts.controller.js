const { Posts } = require('../models');
const Joi = require('joi');

const postSchema = Joi.object({
  title: Joi.string()
    .trim()
    .empty('')
    .max(50)
    .required()
    .messages({
      'any.required': '제목을 입력해주세요.',
      'string.max': `'제목'은 {#limit} 글자 이하로 입력해주세요.`,
    }),
  content: Joi.string()
    .trim()
    .empty('')
    .max(5000)
    .required()
    .messages({
      'any.required': '내용을 입력해주세요.',
      'string.max': `'내용'은 {#limit} 글자 이하로 입력해주세요.`,
    }),
  name: Joi.string()
    .trim()
    .empty('')
    .max(10)
    .required()
    .messages({
      'any.required': '닉네임을 입력해주세요.',
      'string.max': `'닉네임'은 {#limit} 글자 이하로 입력해주세요.`,
    }),
  imgsrc: Joi.string()
    .uri()
    .allow(null)
    .optional()
});

const updatePostschema = Joi.object({
  title: Joi.string()
    .trim()
    .empty('')
    .max(50)
    .required()
    .messages({
      'any.required': '제목을 입력해주세요.',
      'string.max': `'제목'은 {#limit} 글자 이하로 입력해주세요.`,
    }),
  content: Joi.string()
    .trim()
    .empty('')
    .max(5000)
    .required()
    .messages({
      'any.required': '내용을 입력해주세요.',
      'string.max': `'내용'은 {#limit} 글자 이하로 입력해주세요.`,
    }),
  imgsrc: Joi.string()
    .uri()
    .allow(null)
    .optional()
});



const createPost = async (req, res) => {
  const { error } = postSchema.validate(req.body); // 본문 스키마 충족조건 판별
  if (error) {
    return res.status(400).json({ errorMessage: error.details[0].message });
  }

  try {
    const { title, content, name, imgsrc } = req.body;
    const savedPost = await Posts.create({ title, content, name, imgsrc });
    return res.status(201).json({ message: "게시글을 생성하였습니다." });
  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .json({ errorMessage: "게시글 생성에 실패하였습니다. " });
  }
};

const findAllPosts = async (req, res) => {
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
  const { error } = updatePostschema.validate(req.body); // 본문 스키마 충족조건 판별
  if (error) {
    return res.status(400).json({ errorMessage: error.details[0].message });
  }
  try {
    const { postId } = req.params;
    const { title, content, imgsrc } = req.body;
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

    // update title and content
    const updatePost = await post.update({ title, content, imgsrc });
    if (!updatePost) {
      return res
        .status(400)
        .json({ errorMessage: "게시글 수정에 실패 하였습니다." });
    }
    return res.status(200).json({ message: "게시글을 수정하였습니다." });
  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .json({ errorMessage: "게시글이 존재하지 않습니다." });
  }
};


const deletePost = async (req, res) => {
  const { error } = postSchema.validate(req.body); // 본문 스키마 충족조건 판별
  if (error) {
    return res.status(400).json({ errorMessage: error.details[0].message });
  }
  try {
    const { postId } = req.params;
    const post = await Posts.findOne({ where: { postId } });

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
