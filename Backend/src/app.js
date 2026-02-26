const express = require("express");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require("./routes/authRoutes");
const healthRoutes = require("./routes/healthRoutes");
const dietRoutes = require("./routes/dietRoutes");

const app = express();

// ✅ CORS add karo
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/health", healthRoutes);
app.use("/api/diet", dietRoutes);

module.exports = app;