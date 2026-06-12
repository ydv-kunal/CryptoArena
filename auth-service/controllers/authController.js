const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const axios = require("axios");

// Signup
exports.signup = async (req, res) => {
  const { username, email, password } = req.body;          // <-- ADDED USERNAME TO DESTRUCTURING

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      username,                                          // <-- ADDED USERNAME TO USER CREATION
      email,
      password: hashedPassword,
    });

    //  CALL TRADING SERVICE TO CREATE PORTFOLIO
    try {
      // await axios.post("http://localhost:5102/portfolio/create", {
      //   userId: user._id,
      // });
      const tradingUrl = process.env.TRADING_SERVICE_URL || "http://localhost:5102";
      await axios.post(`${tradingUrl}/portfolio/create`, {
        userId: user._id,
      });
    } catch (err) {
      //console.log("Portfolio creation failed:", err.message);
      return res.status(500).json({
        message: "Failed to create portfolio"
      });
    }

    res.status(201).json({ message: "User created Successfully. Next step is to Login" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Login
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    //res.json({ token });
    res.json({
      token,
      username: user.username,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Token verification
exports.verify = async (req, res) => {
  res.status(200).json({
    message: "Token valid",
  });
};