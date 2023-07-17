require("dotenv").config();
const { Users } = require("../models");
const bcrypt = require("bcrypt"); // 비밀번호 이중보안
const jwt = require("jsonwebtoken");

const { signupSchema, loginSchema } = require("../validations/auth-validation");

const signupController = async (req, res) => {
  try {
    const { name, password, confirm } = await signupSchema.validateAsync(
      req.body
    );

    // duplicated name check
    const existUsername = await Users.findOne({ where: { name } }); // = Users.exists()
    if (existUsername) {
      return res
        .status(412)
        .json({ errorMessage: "이미 가입된 닉네임입니다." });
    }

    // password double security
    const hashedPassword = bcrypt.hashSync(password, 6);
    const signUp = await Users.create({
      // / =new Users()
      name,
      password: hashedPassword,
    });

    return res.status(201).json({ message: "회원가입에 성공하였습니다." });
  } catch (error) {
    console.log(error);
    if (error.isJoi) {
      return res.status(412).json({ errorMessage: error.message });
    }
    return res.status(400).json({ errorMessage: "회원가입에 실패하였습니다." });
  }
};

const loginController = async (req, res) => {
  try {
    const { name, password } = await loginSchema.validateAsync(req.body);

    const user = await Users.findOne({ where: { name } });
    if (!user || !bcrypt.compareSync(password, user.password)) {
      // 평문 패스워드(사용자 입력 패스워드), 데이터베이스 해시패스워드
      return res
        .status(412)
        .json({ errorMessage: "이름 또는 패스워드를 확인해주세요." });
    }

    // JWT token 발행
    const token = jwt.sign({ name }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res.cookie("userToken", `Bearer ${token}`, { sameSite: "lax" });

    return res
      .status(200)
      .json({ token: token, message: "로그인에 성공하였습니다." });
  } catch (error) {
    console.log(error);
    if (error.isJoi) {
      return res.status(412).json({ errorMessage: error.message });
    }
    return res.status(400).json({ errorMessage: "로그인에 실패하였습니다." });
  }
};

module.exports = {
  signupController,
  loginController,
};
