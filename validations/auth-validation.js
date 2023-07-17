const Joi = require("joi");

const signupSchema = Joi.object({ // 수정맨 
    name: Joi.string()
        .alphanum() // 알파벳(대소문자 구별없이) + 숫자
        .min(3) // 미니멈 (최소 3글자)
        .required() // 반드시 있어야함
        .messages({
            "any.required": "이름을 입력해주세요.",
            "string.min": "이름은 {#limit} 글자 이상이어야 합니다.",
            "any.only": "형식이 올바르지 않습니다.",
            "any.invalid": "형식이 올바르지 않습니다.",
        }),
    password: Joi.string()
        .min(4) // 미니멈 (최소 4글자)
        .required()
        .custom((value, helpers) => {
            if (value.includes(helpers.state.ancestors[0].name)) {
                return helpers.message('패스워드에 닉네임이 포함되어 있습니다.');
            }
            return value;
        })
        .messages({
            "any.required": "패스워드를 입력해주세요.",
            "string.min": "패스워드는 {#limit} 글자 이상이어야 합니다.",
            "any.only": "형식이 올바르지 않습니다.",
            "any.invalid": "형식이 올바르지 않습니다.",
        }),
    confirm: Joi.string()
        .equal(Joi.ref('password'))
        .required()
        .label('비밀번호 확인')
        .messages({ 'any.only': '비밀번호가 일치하지 않습니다' }),
});

const loginSchema = Joi.object({
    name: Joi.string()
        .required()
        .messages({
            "any.required": "이름을 입력해주세요.",
            "any.only": "형식이 올바르지 않습니다.",
            "any.invalid": "형식이 올바르지 않습니다.",
        }),
    password: Joi.string()
        .required()
        .messages({
            "any.required": "패스워드를 입력해주세요.",
            "any.only": "형식이 올바르지 않습니다.",
            "any.invalid": "형식이 올바르지 않습니다.",
        }),
});

module.exports = {
    signupSchema,
    loginSchema,
};
