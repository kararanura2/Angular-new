const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
app.use(cors());

const PORT = 3000;

// Octagon API URL
const OCTAGON_URL = "https://api.octagon-api.com/fighters";

// Cache to avoid re-fetching 150+ fighters every search
let cachedFighters = null;

// Utility: fetch + cache fighters
async function loadFighters() {
  if (cachedFighters) return cachedFighters;

  const { data } = await axios.get(OCTAGON_URL);

  // Transform object → array with id field
  const list = Object.keys(data).map(key => ({
    id: key,
    ...data[key],
  }));

  cachedFighters = list;
  return list;
}

// MAIN ENDPOINT → supports ?q= search
app.get("/fighters", async (req, res) => {
  try {
    const q = (req.query.q || "").toLowerCase().trim();
    const fighters = await loadFighters();

    // If no query, return full list
    if (!q) {
      return res.json(fighters);
    }

    // Filter by name or nickname
    const filtered = fighters.filter(f => 
      f.name.toLowerCase().includes(q) ||
      (f.nickname && f.nickname.toLowerCase().includes(q))
    );

    return res.json(filtered);

  } catch (err) {
    console.error("Server error:", err);
    res.status(500).json({ error: "Server error fetching fighters." });
  }
});

// DETAILS ENDPOINT
app.get("/fighter/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const { data } = await axios.get(`https://api.octagon-api.com/fighter/${id}`);
    res.json(data);
  } catch (err) {
    res.status(404).json({ error: "Fighter not found" });
  }
});

app.listen(PORT, () => {
  console.log(`🔥 UFC Proxy Server running on http://localhost:${PORT}`);
});
