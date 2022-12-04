const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");
const bodyParser = require("body-parser");
const authRouter = require("./router/Auth");
const userRouter = require("./router/Router");

dotenv.config();
app.use(express());
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

mongoose.connect(process.env.MONGO_URL, () => {
  console.log("mongoose connected...");
});

app.use("/auth", authRouter);
app.use("/user", userRouter);

const ___dirname = path.resolve();
app.use(express.static(path.join(___dirname, "./client/build")));
app.get("*", (req, res) => {
  res.sendFile(
    path.join(___dirname, "./client/build/index.html"),
    function (err) {
      res.status(500).send(err);
    }
  );
});

app.listen(process.env.PORT || 8000, () => {
  console.log("server is running...");
});
