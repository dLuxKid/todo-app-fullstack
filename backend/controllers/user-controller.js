const bcrypt = require("bcrypt");

const { createTokenAndSend } = require("../utils/token");

const User = require("../models/user-model");

const signup = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const newUser = await User.create({ username, email, password });

    createTokenAndSend(res, 201, newUser);
  } catch (error) {
    res.status(404).json({
      status: "fail",
      error,
      message: "Error creating account",
    });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password)
    return res.status(400).json({
      status: "fail",
      message: "Please provide email or password",
    });

  try {
    const user = await User.findOne({ email });

    if (!(await bcrypt.compare(password, user.password)) || !user)
      return res.status(401).json({
        status: "fail",
        message: "Email or password is incorrect",
      });

    createTokenAndSend(res, 200, user);
  } catch (error) {
    res.status(500).json({
      status: "fail",
      error,
      message: "Something went wrong",
    });
  }
};

module.exports = { signup, login };
