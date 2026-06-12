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

app.listen(5101,"0.0.0.0", () => console.log("Auth Service running on 5101"));