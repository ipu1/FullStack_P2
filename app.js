const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors'); // Import the cors package
const songRoutes = require('./api/routes/songRoutes'); // Import songRoutes.js
const path = require('path'); // Import the path module

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(cors('*')); // Enable CORS for all routes

// Connect to MongoDB
mongoose.connect('mongodb+srv://myAtlas-001:1234@cluster0.uhslgbg.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Middleware to set Content-Type header for CSS files
app.use((req, res, next) => {
    if (req.url.endsWith('.css')) {
      res.setHeader('Content-Type', 'text/css');
    }
    next();
  });

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/api/songs', songRoutes); // Use songRoutes for /api/songs


//Root router
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html')); // Serve index.html
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});