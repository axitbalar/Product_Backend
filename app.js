const express = require('express');
const bodyParser = require('body-parser');
const connectToDatabase = require('./helpers/database');
const deviceRoutes = require('./routes/deviceRoutes');

const app = express();
const port = 8000; // Change this to whatever port you prefer
const mongoURI = 'mongodb://localhost:27017/device-api'; // Change this to your MongoDB URI

// Connect to MongoDB
connectToDatabase(mongoURI);

// Middleware
app.use(bodyParser.json());

// Routes
app.use('/api', deviceRoutes);

// Start the server
app.listen(port, () => {
    console.log(`Server is listening at http://localhost:${port}`);
});
