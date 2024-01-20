const express = require("express");

const { signup, login } = require("../controllers/user-controller");
const { verifyToken } = require("../utils/token");

const router = express.Router();

router.post("/signup", signup);
router.post("/login", verifyToken, login);

module.exports = router;
