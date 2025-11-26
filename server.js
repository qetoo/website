const express = require('express');
const path = require('path');

// Initialize the Express application
const app = express();
// Render sets the PORT environment variable; default to 3000 for local testing
const PORT = process.env.PORT || 3000;

// Serve static files (like the index.html) from the current directory
app.use(express.static(path.join(__dirname)));

// Start the server
app.listen(PORT, () => {
    console.log(`Web Service is running on http://localhost:${PORT}`);
    console.log('Serving index.html as the primary application.');
});
