const express = require("express");
const router = express.Router();
const Portfolio = require("../models/Portfolio");
const authMiddleware = require("../middleware/authMiddleware");
const Transaction = require("../models/Transaction");
const { latestPrices } = require("../utils/prices");

// BUY CRYPTO API
// protect routes
router.post("/buy", authMiddleware, async (req, res) => {
    try {
        const { symbol, quantity, price } = req.body;
        const userId = req.user.userId;

        // 1️⃣ Find user portfolio
        const portfolio = await Portfolio.findOne({ userId });

        if (!portfolio) {
            return res.status(404).json({ message: "Portfolio not found" });
        }

        // 2️⃣ Calculate total cost
        const totalCost = quantity * price;

        // 3️⃣ Check if user has enough balance
        if (portfolio.balance < totalCost) {
            return res.status(400).json({ message: "Insufficient balance" });
        }

        // 4️⃣ Deduct balance
        portfolio.balance -= totalCost;

        // 5️⃣ Check if asset already exists
        const existingAsset = portfolio.assets.find(
            (asset) => asset.symbol === symbol
        );

        if (existingAsset) {
            // 🧠 Calculate new average price

            const totalOldValue =
                existingAsset.quantity * existingAsset.avgPrice;

            const totalNewValue = totalCost;

            const newQuantity = existingAsset.quantity + quantity;

            const newAvgPrice =
                (totalOldValue + totalNewValue) / newQuantity;

            // update values
            existingAsset.quantity = newQuantity;
            existingAsset.avgPrice = newAvgPrice;

        } else {
            // 6️⃣ Add new crypto to portfolio
            portfolio.assets.push({
                symbol,
                quantity,
                avgPrice: price,
            });
        }

        // 7️⃣ Save updated portfolio
        await portfolio.save();

        // after successful buy
        await Transaction.create({
            userId,
            symbol,
            type: "BUY",
            quantity,
            price,
            total: quantity * price,
        });

        res.json({
            message: "Crypto bought successfully",
            portfolio,
        });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// SELL CRYPTO API
router.post("/sell", authMiddleware, async (req, res) => {
    try {
        const { symbol, quantity, price } = req.body;
        const userId = req.user.userId;

        // 1️⃣ Find portfolio
        const portfolio = await Portfolio.findOne({ userId });

        if (!portfolio) {
            return res.status(404).json({ message: "Portfolio not found" });
        }

        // 2️⃣ Find asset
        const existingAsset = portfolio.assets.find(
            (asset) => asset.symbol === symbol
        );

        if (!existingAsset) {
            return res.status(400).json({ message: "Asset not found" });
        }

        // 3️⃣ Check quantity
        if (existingAsset.quantity < quantity) {
            return res.status(400).json({ message: "Not enough crypto to sell" });
        }

        // 4️⃣ Calculate sell value
        const totalSellValue = quantity * price;

        // Calculate profit
        const profit = (price - existingAsset.avgPrice) * quantity;

        // 5️⃣ Add money back
        portfolio.balance += totalSellValue;

        // 6️⃣ Reduce asset quantity
        existingAsset.quantity -= quantity;

        // 7️⃣ If quantity becomes 0 → remove asset
        if (existingAsset.quantity === 0) {
            portfolio.assets = portfolio.assets.filter(
                (asset) => asset.symbol !== symbol
            );
        }

        // 8️⃣ Save
        await portfolio.save();

        // after successful sell
        await Transaction.create({
            userId,
            symbol,
            type: "SELL",
            quantity,
            price,
            total: quantity * price,
        });

        res.json({
            message: "Crypto sold successfully",
            profit,
            portfolio,
        });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// GET USER PORTFOLIO API
router.get("/portfolio", authMiddleware, async (req, res) => {
    try {
        // 1️⃣ Get userId from token
        const userId = req.user.userId;

        // 2️⃣ Find portfolio
        const portfolio = await Portfolio.findOne({ userId });

        if (!portfolio) {
            return res.status(404).json({ message: "Portfolio not found" });
        }

        const updatedAssets = portfolio.assets.map((asset) => {
            const currentPrice =
                latestPrices[asset.symbol] || asset.avgPrice;

            const profit =
                (currentPrice - asset.avgPrice) * asset.quantity;

            return {
                ...asset._doc,
                currentPrice,
                profit,
            };
        }); 

        res.json({
            balance: portfolio.balance,
            assets: updatedAssets,
        });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

//Get Transaction History API
router.get("/transactions", authMiddleware, async (req, res) => {
    try {
        const userId = req.user.userId;

        const transactions = await Transaction.find({ userId })
            .sort({ createdAt: -1 });

        res.json({ transactions });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;