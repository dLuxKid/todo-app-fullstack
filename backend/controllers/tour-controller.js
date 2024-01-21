const Todo = require("../models/todo-model");

const getTodos = async (req, res) => {
  try {
    const todos = await Todo.find({ userId: req.user._id });
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

const updateTodo = async (req, res) => {
  const todoId = req.params.todoId;
  const { title, description, completed } = req.body;

  try {
    const existingTodo = await Todo.findById(todoId);

    if (!existingTodo) {
      return res.status(404).json({ message: "Todo not found" });
    }

    const todo = {
      title: title,
      description: description,
      completed: completed,
    };

    const updatedTodo = await Todo.findByIdAndUpdate(todoId, todo, {
      runValidators: true,
      new: true,
    });

    res.status(200).json({
      status: "success",
      data: {
        todo: updatedTodo,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "something went wrong" });
  }
};

const deleteTodo = async (req, res) => {
  const todoId = req.params.todoId;
  try {
    await Todo.findByIdAndDelete(todoId);

    res.status(200).json({
      status: "success",
      data: {
        todo: null,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "something went wrong" });
  }
};

module.exports = { getTodos, createTodo, updateTodo, deleteTodo };
