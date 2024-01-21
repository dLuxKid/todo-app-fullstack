const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

const userRouter = require("./routes/user-route");
const todoRouter = require("./routes/todo-route");

const app = express();

dotenv.config({ path: "./config.env" });

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

mongoose
  .connect(process.env.mongo_uri)
  .then(() => console.log("connection successful"))
  .catch((err) => console.log("Error", err));

app.use("/api/user", userRouter);
app.use("/api/todo", todoRouter);

app.listen(5000, () => {
  console.log("server is live");
});
