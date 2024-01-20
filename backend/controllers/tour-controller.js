const Todo = require("../models/todo-model");

const getTodos = async (req, res) => {
  try {
    const todos = await Todo.find({ user: req.user._id });
    res.status(200).json({
      status: "success",
      data: { todos },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: "error fetching todos",
    });
  }
};

const createTodo = async (req, res) => {
  const { title, description } = req.body;

  try {
    const todo = await Todo.create({
      title,
      description,
      completed: false,
      userId: req.user._id,
    });

    res.status(200).json({
      status: "success",
      data: { todo },
    });
  } catch (error) {
    res.status(404).json({
      status: "fail",
      message: "error creating your todo",
    });
  }
};

module.exports = { getTodos, createTodo };
