// index.js
const express = require('express');
const cors = require('cors');
require('dotenv').config(); // Load environment variables
const connectDB = require('./config/db');  // Import connectDB once
const problemRouter = require('./routes/Problem');  // Path to your problem route file
const runCodeRoute = require('./routes/runCode');  // Assuming you have this route for running code

const app = express();
app.use(cors()); // Enable CORS
app.use(express.json()); // Parse JSON bodies

// Connect to the database

// Use routes
app.use('/api/problems', problemRouter);  // Problem routes
app.use('/api', runCodeRoute);  // Run code routes
connectDB();
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);


});
