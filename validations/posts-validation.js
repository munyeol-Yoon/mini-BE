const Joi = require("joi");

const postSchema = Joi.object({
  title: Joi.string().trim().empty("").max(50).required().messages({
    "any.required": "제목을 입력해주세요.",
    "string.max": `'제목'은 {#limit} 글자 이하로 입력해주세요.`,
    "any.only": "형식이 올바르지 않습니다.",
    "any.invalid": "형식이 올바르지 않습니다.",
  }),
  content: Joi.string().trim().empty("").max(300).required().messages({
    "any.required": "내용을 입력해주세요.",
    "string.max": `'내용'은 {#limit} 글자 이하로 입력해주세요.`,
    "any.only": "형식이 올바르지 않습니다.",
    "any.invalid": "형식이 올바르지 않습니다.",
  }),
  imgsrc: Joi.string().uri().allow(null).optional(),
});

module.exports = {
  postSchema,
};
