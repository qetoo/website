const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files (index.html, css, js)
app.use(express.static(path.join(__dirname)));

app.get('/lookup', async (req, res) => {
    const ip = req.query.ip;

    if (!ip) {
        return res.status(400).json({ error: "Missing IP address" });
    }

    try {
        // Fetch IP details from ipapi
        const response = await fetch(`https://ipapi.co/${ip}/json/`, {
            headers: {
                "User-Agent": "Mozilla/5.0"
            }
        });

        if (!response.ok) {
            return res.status(500).json({ error: "Upstream IP API Error" });
        }

        const data = await response.json();
        res.json(data);

    } catch (error) {
        console.error("Lookup error:", error);
        res.status(500).json({ error: "Failed to fetch IP details" });
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`Web Service running on http://localhost:${PORT}`);
});
