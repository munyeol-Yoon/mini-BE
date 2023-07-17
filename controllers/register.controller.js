const { Users } = require("../models");

const signupController = (req, res) => {
  return res.send("회원가입 만드세요.");
};

const loginController = (req, res) => {
  return res.send("로그인 만드세요.");
};

module.exports = {
  signupController,
  loginController,
};
