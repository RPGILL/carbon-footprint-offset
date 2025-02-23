const express = require('express');
const app = express();
const path = require('path');

// Serve static files from the "public" folder
app.use(express.static('public'));

// Serve the HTML file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Set the port for the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
