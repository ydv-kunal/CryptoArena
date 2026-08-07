require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

connectDB();

app.use("/portfolio", require("./routes/portfolioRoutes"));
app.use("/trade", require("./routes/tradeRoutes"));

app.get("/", (req, res) => {
  res.send("Trading Service Running");
});

const PORT = process.env.PORT || 5102;

// Start HTTP server
app.listen(PORT, "0.0.0.0", () => console.log(`Trading Service running on port ${PORT}`));