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
  try {
    const res = await axios.get(
      "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,dogecoin,solana,binancecoin,litecoin,ripple&vs_currencies=usd",
      { timeout: 4000 }
    );

    return {
      BTC: res.data.bitcoin?.usd || latestPrices.BTC,
      ETH: res.data.ethereum?.usd || latestPrices.ETH,
      DOGE: res.data.dogecoin?.usd || latestPrices.DOGE,
      SOL: res.data.solana?.usd || latestPrices.SOL,
      BNB: res.data.binancecoin?.usd || latestPrices.BNB,
      LTC: res.data.litecoin?.usd || latestPrices.LTC,
      XRP: res.data.ripple?.usd || latestPrices.XRP,
    };
  } catch (err) {
    console.log("CoinGecko fetch warning (using fallback/latest):", err.message);
    return null;
  }
}

// Periodically update live prices & broadcast to WebSocket clients
setInterval(async () => {
  const newPrices = await getLivePrices();

  if (newPrices) {
    Object.assign(latestPrices, newPrices);
    console.log("Updated Market Prices:", latestPrices);
  }

  // Broadcast to all connected WebSocket clients
  clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(latestPrices));
    }
  });
}, 5000);
