const express = require("express");
require("dotenv").config();

const authRoutes = require("./routes/authRoutes");
const healthRoutes = require("./routes/healthRoutes");
const workoutRoutes = require("./routes/workoutRoutes");
const progressRoutes = require("./routes/progressRoutes");
const bodyMeasurementRoutes = require("./routes/bodyMeasurementRoutes");



const app = express();

app.use(express.json());
app.use("/api/auth", authRoutes);

app.use("/api", bodyMeasurementRoutes);
app.use("/api/progress", progressRoutes);
app.use("/api/workout", workoutRoutes);

app.use("/api/health", healthRoutes);

module.exports = app;