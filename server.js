const express = require('express');
const app = express();

const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.static('public'));
app.use(express.json());

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.post('/', (req, res) => {
    console.log(req.body);
    res.json({ message: 'success' });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
