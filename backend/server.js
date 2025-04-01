require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
const urlRouter = require("./routes/url");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Debugging Middleware (Add this FIRST)
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
  next();
});

// Database Connection
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Routes
app.use("/api/url", urlRouter);

// Simple Route Listing (Alternative to app._router)
app.get("/routes", (req, res) => {
  const routes = [
    "GET    /api/url/test",
    "GET    /api/url/urls",
    "POST   /api/url/shorten",
    "GET    /api/url/:shortUrl",
    "GET    /api/url/stats/:shortUrl",
  ];
  res.json({ availableRoutes: routes });
});

// Error Handling
app.use((err, req, res, next) => {
  console.error("Server error:", err);
  res.status(500).json({ error: "Internal server error" });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`Try these endpoints:
  http://localhost:${PORT}/routes
  http://localhost:${PORT}/api/url/test
  `);
});
