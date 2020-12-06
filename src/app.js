require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const helmet = require("helmet");
const { NODE_ENV } = require("./config");

const contactRouter = require("./contact/contactRoutes");
const userRouter = require("./user/userRoutes")
const authRouter = require("./user/jwtAuth")
const uploadRouter = require("./user/imageUpload")

const app = express();

const morganOption = NODE_ENV === "production" ? "tiny" : "common";

app.use(morgan(morganOption));
app.use(helmet());
app.use(cors());
app.use(express.json())

app.use("/api/contacts", contactRouter);
app.use("/auth", authRouter)
app.use("/api/user", userRouter)
app.use("/", uploadRouter)

app.get("/", (req, res) => {
  res.send("Hello, world!");
});

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next()
})
app.use(function errorHandler(error, req, res, next) {
  let response;
  if (NODE_ENV === "production") {
    response = { error: { message: "server error" } };
  } else {
    console.error(error);
    response = { message: error.message, error };
  }
  res.status(500).json(response);
});

module.exports = app;
