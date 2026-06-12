const express = require("express");
const router = express.Router();
const Portfolio = require("../models/Portfolio");

router.post("/create", async (req, res) => {
  try {
    const { userId } = req.body;

    const existing = await Portfolio.findOne({ userId });
    if (existing) {
      return res.status(400).json({ message: "Portfolio exists" });
    }

    const portfolio = await Portfolio.create({ userId });

    res.json({ message: "Portfolio created", portfolio });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;