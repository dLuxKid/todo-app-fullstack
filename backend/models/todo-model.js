const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Please name your task"],
    min: [3, "title must have more than 3 chracters"],
    trim: true,
  },
  description: {
    type: String,
    required: [true, "Please describe your task"],
    min: [10, "Task is not descriptive enough"],
    trim: true,
  },
  completed: {
    type: Boolean,
    default: false,
  },
  userId: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: [true, "Todo is not registered with a user"],
  },
});

const Todo = mongoose.model("Todo", todoSchema);

module.exports = Todo;
