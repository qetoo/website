const express = require('express');
const fetch = require('node-fetch'); // make sure you install it: npm install node-fetch
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files
app.use(express.static(path.join(__dirname)));

// Lookup endpoint
app.get('/lookup', async (req, res) => {
    const ip = req.query.ip;

    if (!ip) {
        return res.status(400).json({ error: "IP address is required" });
    }

    try {
        // Use ip-api.com free API
        const response = await fetch(`http://ip-api.com/json/${ip}?fields=status,message,country,countryCode,region,regionName,city,lat,lon,timezone,isp,query`);
        const data = await response.json();

        if (data.status === 'success') {
            res.json(data);
        } else {
            res.status(400).json({ error: `Upstream IP API Error: ${data.message}` });
        }
    } catch (err) {
        console.error("Error fetching IP details:", err);
        res.status(500).json({ error: "Failed to fetch IP details" });
    }
});

app.listen(PORT, () => {
    console.log(`Web Service running on http://localhost:${PORT}`);
});
