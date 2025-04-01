const express = require("express");
const router = express.Router();
const URL = require("../models/url");

// 1. Test Route (FIRST)
router.get("/test", (req, res) => {
  console.log("✅ Test route hit");
  res.json({ message: "Test route working!", timestamp: new Date() });
});

// 2. Get All URLs
router.get("/urls", async (req, res) => {
  try {
    console.log("Fetching URLs from DB...");
    const urls = await URL.find().sort({ createdAt: -1 });
    console.log(`Found ${urls.length} URLs`);
    res.json(urls);
  } catch (err) {
    console.error("DB Error:", err);
    res.status(500).json({ error: "Database operation failed" });
  }
});

// Shorten URL
router.post("/shorten", async (req, res) => {
  try {
    const { fullUrl } = req.body;

    // Check if URL already exists
    const existingUrl = await URL.findOne({ fullUrl });
    if (existingUrl) {
      return res.json(existingUrl);
    }

    // Create new short URL
    const newUrl = await URL.create({ fullUrl });
    res.status(201).json(newUrl);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Redirect to original URL
router.get("/:shortUrl", async (req, res) => {
  try {
    const { shortUrl } = req.params;
    const url = await URL.findOneAndUpdate(
      { shortUrl },
      { $inc: { clicks: 1 } },
      { new: true }
    );

    if (!url) {
      return res.status(404).json({ error: "URL not found" });
    }

    res.redirect(url.fullUrl);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get URL stats
router.get("/stats/:shortUrl", async (req, res) => {
  try {
    const { shortUrl } = req.params;
    const url = await URL.findOne({ shortUrl });

    if (!url) {
      return res.status(404).json({ error: "URL not found" });
    }

    res.json(url);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
