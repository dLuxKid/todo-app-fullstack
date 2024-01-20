const express = require("express");

const { getTodos, createTodo } = require("../controllers/tour-controller");

const { verifyToken } = require("../utils/token");

const router = express.Router();

router.route("/").get(verifyToken, getTodos).post(verifyToken, createTodo);

// router.route("/:todoId").get().patch().delete();

module.exports = router;
