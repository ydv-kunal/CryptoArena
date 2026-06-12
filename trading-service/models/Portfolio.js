const mongoose = require("mongoose");

const assetSchema = new mongoose.Schema({
  symbol: String,
  quantity: Number,
  avgPrice: Number,
});

const portfolioSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    unique: true,
  },
  balance: {
    type: Number,
    default: 100000, // starting virtual money
  },
  assets: [assetSchema],
});

module.exports = mongoose.model("Portfolio", portfolioSchema);