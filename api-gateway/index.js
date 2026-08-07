require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { createProxyMiddleware } = require("http-proxy-middleware");

const app = express();
app.use(cors());

const authTarget = (process.env.AUTH_SERVICE_URL || "http://localhost:5101").replace(/\/auth\/?$/, "").replace(/\/$/, "");
const tradingTarget = (process.env.TRADING_SERVICE_URL || "http://localhost:5102").replace(/\/trade\/?$/, "").replace(/\/$/, "");
const marketTarget = (process.env.MARKET_SERVICE_URL || "http://localhost:5103").replace(/\/market\/?$/, "").replace(/\/$/, "");

app.use(
  "/auth",
  createProxyMiddleware({
    target: `${authTarget}/auth`,
    changeOrigin: true,
  })
);

app.use(
  "/trade",
  createProxyMiddleware({
    target: `${tradingTarget}/trade`,
    changeOrigin: true,
  })
);

app.use(
  "/market",
  createProxyMiddleware({
    target: `${marketTarget}/market`,
    changeOrigin: true,
    ws: true,
  })
);

app.get("/", (req, res) => {
  res.send("API Gateway Running");
});

const PORT = process.env.PORT || 5100;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Gateway running on ${PORT}`);
});