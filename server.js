const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files (index.html, CSS, JS)
app.use(express.static(path.join(__dirname)));

// Main IP lookup route
app.get('/lookup', async (req, res) => {
    const ip = req.query.ip;

    if (!ip) {
        return res.status(400).json({ error: "Missing IP address" });
    }

    try {
        // Built-in fetch (Node 18+)
        const response = await fetch(`https://ipapi.co/${ip}/json/`);
        const data = await response.json();

        res.json(data);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch IP details" });
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`Web Service running on port ${PORT}`);
});
