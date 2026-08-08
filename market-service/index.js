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
  // 1. Primary: Binance US High-Volume USDT Pairs (Ultra fast, 0 IP bans)
  try {
    const res = await axios.get("https://api.binance.us/api/v3/ticker/price", {
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
        let p = parseFloat(item.price);
        const coinMap = {
          BTCUSDT: "BTC",
          ETHUSDT: "ETH",
          DOGEUSDT: "DOGE",
          SOLUSDT: "SOL",
          BNBUSDT: "BNB",
          LTCUSDT: "LTC",
          XRPUSDT: "XRP"
        };
        const coin = coinMap[item.symbol];
        if (coin) {
          // If price hasn't moved on exchange in 5s, add a tiny micro-tick (±0.01%) so tickers continuously move
          if (latestPrices[coin] && latestPrices[coin] === p) {
            const jitter = (Math.random() - 0.48) * 0.0002 * p;
            p = p + jitter;
          }
          priceMap[coin] = parseFloat(p.toFixed(coin === "DOGE" ? 4 : (coin === "XRP" ? 3 : 2)));
        }
      });
    }

    if (Object.keys(priceMap).length > 0) {
      return { prices: priceMap, source: "Binance US API" };
    }
  } catch (err) {
    console.log("Binance US API fetch warning:", err.message);
  }

  // 2. Secondary: Coinbase Public API
  try {
    const coins = ["BTC", "ETH", "DOGE", "SOL", "BNB", "LTC", "XRP"];
    const priceMap = {};
    await Promise.all(
      coins.map(async (c) => {
        const res = await axios.get(`https://api.coinbase.com/v2/prices/${c}-USD/spot`, {
          headers: {
            "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36"
          },
          timeout: 4000
        });
        const p = parseFloat(res.data?.data?.amount);
        if (!isNaN(p)) {
          priceMap[c] = parseFloat(p.toFixed(c === "DOGE" ? 4 : (c === "XRP" ? 3 : 2)));
        }
      })
    );

    if (Object.keys(priceMap).length > 0) {
      return { prices: priceMap, source: "Coinbase API" };
    }
  } catch (err) {
    console.log("Coinbase API fetch warning:", err.message);
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
    // 3. Fallback: Return exact cached prices without micro-noise
    return { prices: { ...latestPrices }, source: "Cached Prices (Fallback)" };
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
