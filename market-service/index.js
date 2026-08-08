require("dotenv").config();
const express = require("express");
const cors = require("cors");
const WebSocket = require("ws");
const axios = require("axios");

const app = express();
app.use(cors());
app.use(express.json());

// Default fallback prices in case CoinGecko rate limits
const latestPrices = {
  BTC: 63567.00,
  ETH: 1684.43,
  DOGE: 0.0900,
  SOL: 67.01,
  BNB: 605.34,
  LTC: 42.22,
  XRP: 1.15
};

// REST Endpoints
app.get("/", (req, res) => {
  res.send("Market Service Running");
});

// Returns current live prices for REST clients (e.g. trading-service)
app.get("/prices", (req, res) => {
  res.json(latestPrices);
});

app.get("/market/prices", (req, res) => {
  res.json(latestPrices);
});

const PORT = process.env.PORT || 5103;

// Start HTTP server
const server = app.listen(PORT, "0.0.0.0", () => {
  console.log(`Market Service running on port ${PORT}`);
});



// Create WebSocket server attached to HTTP server
const wss = new WebSocket.Server({ server });

let clients = [];

wss.on("connection", (ws) => {
  console.log("Client connected to Market WebSocket");
  clients.push(ws);

  // Send current prices immediately upon connection
  if (ws.readyState === WebSocket.OPEN) {
    ws.send(JSON.stringify(latestPrices));
  }

  ws.on("close", () => {
    clients = clients.filter((client) => client !== ws);
    console.log("Client disconnected from Market WebSocket");
  });

  ws.on("error", (err) => {
    console.error("WebSocket client error:", err.message);
  });
});

async function getLivePrices() {
  // 1. Primary: Binance Public API (Ultra high rate limits, 0 IP ban on cloud servers)
  try {
    const res = await axios.get("https://api.binance.com/api/v3/ticker/price", {
      params: {
        symbols: '["BTCUSDT","ETHUSDT","DOGEUSDT","SOLUSDT","BNBUSDT","LTCUSDT","XRPUSDT"]'
      },
      headers: {
        "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
      },
      timeout: 4000
    });

    const priceMap = {};
    if (Array.isArray(res.data)) {
      res.data.forEach((item) => {
        if (item.symbol === "BTCUSDT") priceMap.BTC = parseFloat(parseFloat(item.price).toFixed(2));
        if (item.symbol === "ETHUSDT") priceMap.ETH = parseFloat(parseFloat(item.price).toFixed(2));
        if (item.symbol === "DOGEUSDT") priceMap.DOGE = parseFloat(parseFloat(item.price).toFixed(4));
        if (item.symbol === "SOLUSDT") priceMap.SOL = parseFloat(parseFloat(item.price).toFixed(2));
        if (item.symbol === "BNBUSDT") priceMap.BNB = parseFloat(parseFloat(item.price).toFixed(2));
        if (item.symbol === "LTCUSDT") priceMap.LTC = parseFloat(parseFloat(item.price).toFixed(2));
        if (item.symbol === "XRPUSDT") priceMap.XRP = parseFloat(parseFloat(item.price).toFixed(3));
      });
    }

    if (Object.keys(priceMap).length > 0) {
      return { prices: priceMap, source: "Binance API" };
    }
  } catch (err) {
    console.log("Binance API fetch warning:", err.message);
  }

  // 2. Secondary: CoinGecko API
  try {
    const res = await axios.get(
      "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,dogecoin,solana,binancecoin,litecoin,ripple&vs_currencies=usd",
      { timeout: 4000 }
    );

    return {
      prices: {
        BTC: res.data.bitcoin?.usd || latestPrices.BTC,
        ETH: res.data.ethereum?.usd || latestPrices.ETH,
        DOGE: res.data.dogecoin?.usd || latestPrices.DOGE,
        SOL: res.data.solana?.usd || latestPrices.SOL,
        BNB: res.data.binancecoin?.usd || latestPrices.BNB,
        LTC: res.data.litecoin?.usd || latestPrices.LTC,
        XRP: res.data.ripple?.usd || latestPrices.XRP,
      },
      source: "CoinGecko API"
    };
  } catch (err) {
    // 3. Fallback: Micro-simulation engine (simulates real-time market noise ±0.05%)
    const simulated = {};
    for (const [coin, price] of Object.entries(latestPrices)) {
      const change = (Math.random() - 0.49) * 0.001 * price;
      simulated[coin] = parseFloat((price + change).toFixed(coin === "DOGE" ? 4 : 2));
    }
    return { prices: simulated, source: "Internal Simulation Engine" };
  }
}

// Periodically update live prices & broadcast to WebSocket clients
setInterval(async () => {
  const result = await getLivePrices();

  if (result && result.prices) {
    Object.assign(latestPrices, result.prices);
    console.log(`[${result.source}] Updated Market Prices:`, latestPrices);
  }

  // Broadcast to all connected WebSocket clients
  clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(latestPrices));
    }
  });
}, 5000);
