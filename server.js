const express = require('express');
const bodyParser = require('body-parser');
const connectToDatabase = require('./helpers/database');
const deviceRoutes = require('./routes/deviceRoutes');

const app = express();
const port = 8000; // Change this to whatever port you prefer
const mongoURI = 'mongodb+srv://axitbalar:AXIt%403810@cluster0.a2xzvn6.mongodb.net/'; // Change this to your MongoDB URI

// const { firebase } = require("./firebase/index")

// Connect to MongoDB
connectToDatabase(mongoURI);

// Middleware
app.use(bodyParser.json());

// Routes
app.use('/api', deviceRoutes);
app.get('/', (req, res) => {
    res.status(200).json({ "Message": "Api is running successfully " });
})

// Start the server
app.listen(port, () => {
    console.log(`Server is listening at http://localhost:${port}`);
});
