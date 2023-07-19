require("dotenv").config();

const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

const app = express();
const PORT = process.env.PORT || 3000;

let corsOptions = {
  origin: "https://fe-mini-project.vercel.app/",
  credential: true,
  // optionsSuccessStatus: 200,
  // exposedHeaders: ["Authorization"],
  // allowedHeaders: ["Authorization", "Content-Type"],
};

const indexRouter = require("./routes");

app.use(cors(corsOptions));
app.use(morgan("dev"));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

app.use("/api", indexRouter);

app.use("*", (req, res, next) => {
  return res
    .status(404)
    .json({ errorMessage: "해당 API 를 잘못입력하셨습니다." });
});

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
