require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const app = express();

connectDB();

app.use(cors());
app.use(express.json());

app.use("/auth", require("./routes/authRoutes"));

app.get("/", (req, res) => {
  res.send("Auth Service Running");
});

const PORT = process.env.PORT || 5101;

app.listen(PORT, "0.0.0.0", () => console.log(`Auth Service running on ${PORT}`));