require("dotenv").config();

const express = require("express");
const morgan = require("morgan");

const app = express();
const PORT = process.env.PORT || 3000;

const indexRouter = require("./routes");

app.use(morgan("dev"));
app.use(express.json());

app.get("/", (req, res) => {
  return res.send("Home");
});

app.use("/api", indexRouter);

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
