const express = require("express");
const router = express.Router();
const Portfolio = require("../models/Portfolio");
const authMiddleware = require("../middleware/authMiddleware");
const Transaction = require("../models/Transaction");
const axios = require("axios");

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

        // Calculate total cost
        const totalCost = quantity * price;

        // 2️⃣ Check cash balance
        if (portfolio.balance < totalCost) {
            return res.status(400).json({ message: "Insufficient funds" });
        }

        // 3️⃣ Deduct cash balance
        portfolio.balance -= totalCost;

        // 4️⃣ Check if user already owns this asset
        const existingAssetIndex = portfolio.assets.findIndex(
            (asset) => asset.symbol === symbol
        );

        if (existingAssetIndex > -1) {
            // Asset exists -> calculate weighted average price & update quantity
            const existingAsset = portfolio.assets[existingAssetIndex];

            const newTotalQuantity = existingAsset.quantity + quantity;
            const newAvgPrice =
                (existingAsset.quantity * existingAsset.avgPrice +
                    quantity * price) /
                newTotalQuantity;

            portfolio.assets[existingAssetIndex].quantity = newTotalQuantity;
            portfolio.assets[existingAssetIndex].avgPrice = newAvgPrice;
        } else {
            // New asset -> push to portfolio
            portfolio.assets.push({
                symbol,
                quantity,
                avgPrice: price,
            });
        }

        // 5️⃣ Save portfolio
        await portfolio.save();

        // 6️⃣ Record transaction
        await Transaction.create({
            userId,
            symbol,
            type: "BUY",
            quantity,
            price,
            total: totalCost,
        });

        res.json({ message: "Crypto purchased successfully", portfolio });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// SELL CRYPTO API
router.post("/sell", authMiddleware, async (req, res) => {
    try {
        const { symbol, quantity, price } = req.body;
        const userId = req.user.userId;

        const portfolio = await Portfolio.findOne({ userId });

        if (!portfolio) {
            return res.status(404).json({ message: "Portfolio not found" });
        }

        // 1️⃣ Find asset in portfolio
        const assetIndex = portfolio.assets.findIndex(
            (asset) => asset.symbol === symbol
        );

        if (assetIndex === -1) {
            return res.status(400).json({ message: "You do not own this asset" });
        }

        const asset = portfolio.assets[assetIndex];

        // 2️⃣ Check if user has enough quantity to sell
        if (asset.quantity < quantity) {
            return res.status(400).json({ message: "Insufficient asset quantity to sell" });
        }

        // 3️⃣ Calculate revenue & update cash balance
        const totalRevenue = quantity * price;
        portfolio.balance += totalRevenue;

        // 4️⃣ Update asset quantity or remove if quantity becomes 0
        if (asset.quantity === quantity) {
            portfolio.assets.splice(assetIndex, 1); // remove asset completely
        } else {
            asset.quantity -= quantity;
        }

        await portfolio.save();

        // 5️⃣ Record transaction
        await Transaction.create({
            userId,
            symbol,
            type: "SELL",
            quantity,
            price,
            total: totalRevenue,
        });

        res.json({ message: "Crypto sold successfully", portfolio });

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

        let livePrices = {};
        try {
            const marketUrl = process.env.MARKET_SERVICE_URL || "http://localhost:5103";
            const priceRes = await axios.get(`${marketUrl}/prices`, { timeout: 3000 });
            livePrices = priceRes.data || {};
        } catch (err) {
            console.log("Could not fetch live prices from market-service:", err.message);
        }

        const updatedAssets = portfolio.assets.map((asset) => {
            const currentPrice =
                livePrices[asset.symbol] || asset.avgPrice;

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