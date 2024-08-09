
const express = require('express');
const path = require('path');

const dotenv = require('dotenv');

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;


app.use(express.static(path.join(__dirname, 'public')));

const apiKey = process.env.GOOGLE_MAPS_API_KEY;

// Serve the main page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start the server
app.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`));
