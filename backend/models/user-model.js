const mongoose = require("mongoose");
const validate = require("validator");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "A name is required"],
    min: [3, "A name must have more than 3 chracters"],
    max: [10, "name caannot be greater than 10 chracters"],
    trim: true,
  },
  email: {
    type: String,
    required: [true, "an email is required"],
    validate: {
      validator: function (email) {
        return validate.isEmail(email);
      },
      message: "This is not a valid email",
    },
    unique: true,
  },
  password: {
    type: String,
    required: [true, "a password is required"],
    min: [4, "your password must not be less than 4 characters"],
    selected: false,
  },
});

userSchema.pre("save", async function (next) {
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

const User = mongoose.model("User", userSchema);

module.exports = User;
