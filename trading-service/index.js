require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db");
const WebSocket = require("ws");
const axios = require("axios");
const { latestPrices } = require("./utils/prices");
const cors = require("cors");

const app = express();
app.use(cors());

app.use(express.json());

connectDB(); // 🔥 IMPORTANT

app.use("/portfolio", require("./routes/portfolioRoutes"));
app.use("/trade", require("./routes/tradeRoutes"));

app.get("/", (req, res) => {
  res.send("Trading Service Running");
});




// Start HTTP server
const server = app.listen(5102, () => console.log("Trading running on 5102"));

// Create WebSocket server
const wss = new WebSocket.Server({ server });

// Store connected clients
let clients = [];

wss.on("connection", (ws) => {
  console.log("Client connected");

  clients.push(ws);

  ws.on("close", () => {
    clients = clients.filter((client) => client !== ws);
    console.log("Client disconnected");
  });
});

async function getLivePrices() {
  try {
    const res = await axios.get(
      //"https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,dogecoin,solana,binancecoin,polygon&vs_currencies=usd"
      "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,dogecoin,solana,binancecoin,litecoin,ripple&vs_currencies=usd"
    );

    return {
      BTC: res.data.bitcoin.usd || latestPrices.BTC, // handle missing BTC price bcoz of rate limits
      ETH: res.data.ethereum.usd || latestPrices.ETH, // handle missing ETH price bcoz of rate limits
      DOGE: res.data.dogecoin.usd || latestPrices.DOGE, // handle missing DOGE price bcoz of rate limits
      SOL: res.data.solana.usd || latestPrices.SOL, // handle missing SOL price bcoz of rate limits
      BNB: res.data.binancecoin.usd || latestPrices.BNB, // handle missing BNB price bcoz of rate limits
      LTC: res.data.litecoin.usd || latestPrices.LTC, // handle missing LTC price bcoz of rate limits
      XRP: res.data.ripple?.usd || latestPrices.XRP, // handle missing XRP price bcoz of rate limits
    };
  } catch (err) {
    //console.log("Error fetching prices");
    console.log(err.message); // show real error
    return null;
  }
}

//let latestPrices = {};

setInterval(async () => {
  const prices = await getLivePrices();

  if (prices) {
    // latestPrices = prices;
    Object.assign(latestPrices, prices); // 🔥 important
    console.log("Updated Prices:", latestPrices);
  }

  // 🔥 SEND TO CLIENTS
  clients.forEach((client) => {
    if (client.readyState === 1) {
      client.send(JSON.stringify(latestPrices));
    }
  });
}, 5000); // every 5 seconds