const express = require('express');
const path = require('path');
const fetch = require('node-fetch'); // Needed for API requests

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files (index.html, etc.)
app.use(express.static(path.join(__dirname)));

// Proxy endpoint to fetch IP geolocation
app.get('/:ip', async (req, res) => {
    const ip = req.params.ip;

    try {
        // Using ip-api.com free endpoint
        const response = await fetch(`http://ip-api.com/json/${ip}?fields=status,message,country,countryCode,region,regionName,city,lat,lon,timezone,isp,query`);
        const data = await response.json();

        if (data.status === 'success') {
            res.json(data);
        } else {
            res.status(400).json({ error: `Upstream IP API Error: ${data.message}` });
        }
    } catch (err) {
        console.error('Error fetching IP details:', err);
        res.status(500).json({ error: 'Failed to fetch IP details' });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Web Service is running on http://localhost:${PORT}`);
});
