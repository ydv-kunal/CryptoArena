require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { createProxyMiddleware } = require("http-proxy-middleware");

const app = express();
app.use(cors());

app.use(
  "/auth",
  createProxyMiddleware({
    target: `${process.env.AUTH_SERVICE_URL || "http://localhost:5101"}/auth`,
    changeOrigin: true,
    pathRewrite: {
      "^/auth": "", // Remove /auth prefix when forwarding to auth service
    }
  })
);

app.use(
  "/trade",
  createProxyMiddleware({
    target: `${process.env.TRADING_SERVICE_URL || "http://localhost:5102"}/trade`,
    changeOrigin: true,
    pathRewrite: {
      "^/trade": "", // Remove /trade prefix when forwarding to trading service
    },
  })
);

app.use(
  "/market",
  createProxyMiddleware({
    target: `${process.env.MARKET_SERVICE_URL || "http://localhost:5103"}/market`,
    changeOrigin: true,
    ws: true,
    pathRewrite: {
      "^/market": "", // Remove /market prefix when forwarding to market service
    },
  })
);

app.get("/", (req, res) => {
  res.send("API Gateway Running");
});

const PORT = process.env.PORT || 5100;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Gateway running on ${PORT}`);
});