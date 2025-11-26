const express = require('express');
const path = require('path');
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args)); // node-fetch v3
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Enable CORS
app.use(cors());

// Serve static files
app.use(express.static(path.join(__dirname)));

// Lookup endpoint
app.get('/lookup', async (req, res) => {
    const ip = req.query.ip;
    if (!ip) return res.status(400).json({ error: "IP address is required" });

    try {
        const response = await fetch(`https://ip-api.com/json/${ip}?fields=status,message,country,countryCode,region,regionName,city,lat,lon,timezone,isp,query`);
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
