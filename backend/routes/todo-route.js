const express = require("express");

const {
  getTodos,
  createTodo,
  updateTodo,
  deleteTodo,
} = require("../controllers/tour-controller");

const { verifyToken } = require("../utils/token");

const router = express.Router();

router.route("/").get(verifyToken, getTodos).post(verifyToken, createTodo);

router
  .route("/:todoId")
  .patch(verifyToken, updateTodo)
  .delete(verifyToken, deleteTodo);

module.exports = router;
