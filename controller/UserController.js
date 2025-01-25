const { handleError } = require("../utils/ErrorHandling");
const Response = require("../utils/Response");
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

module.exports.signUp = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!password || !name || !email) {
      return {
        message: "All fields (name, email, and password) are required.",
        code: 400,
      };
    }
    const existingUser = await User.findOne({ email: email });
    if (existingUser) {
      return { message: "User already exists", code: 400 };
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const user = new User({
      name,
      email,
      password: hashedPassword,
    });

    await user.save();

    return { message: "User Registered successfully" };
  } catch (error) {
    return handleError(error);
  }
};

module.exports.logIn = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email: email });
    if (!user) {
      return { message: "User not found", code: 400 };
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return { message: "Invalid credentials", code: 400 };
    }

    const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY, {
      expiresIn: "24h",
    });

    return { message: "Login successful", data: token };
  } catch (error) {
    return handleError(error);
  }
};
