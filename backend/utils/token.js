const jwt = require("jsonwebtoken");
const User = require("../models/user-model");

const createTokenAndSend = (res, statusCode, user) => {
  const token = jwt.sign({ id: user._id }, process.env.jwt_secret, {
    expiresIn: "30d",
  });

  res.cookie("jwt", token, {
    expires: new Date(Date.now() + 30 * 24 * 60 * 1000),
    httpOnly: true,
    // secure: true,
  });

  const newUser = { username: user.username, email: user.email, _id: user._id };

  res.status(statusCode).json({
    status: "success",
    data: {
      user: newUser,
    },
  });
};

const verifyToken = async (req, res, next) => {
  // const token = req.cookie.jwt;
  let token = "";
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token)
    return res.status(401).json({
      status: "Fail",
      message: "unauthorized: please log in again",
    });

  const decodedToken = jwt.verify(token, process.env.jwt_secret);

  try {
    req.user = await User.findById(decodedToken.id);
  } catch (error) {
    res.status(400).message({
      status: "fail",
      message: "Error verifiying user try again",
    });
  }

  next();
};

module.exports = { createTokenAndSend, verifyToken };
