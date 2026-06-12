const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {                                 // <-- ADDED USERNAME FIELD TO SCHEMA
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  balance: {
    type: Number,
    default: 100000, // starting virtual money
  },
}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);