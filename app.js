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

// const sendNotification = async () => {
//     try {
//         await firebase.messaging().send({
//             token: "cLZYkTaHTT65rvYDscOSGy:APA91bG7uqtJJcnsjkArIXgL3O-AkEnSKuYdrk7AYze-Qdcuw1V23AC4NxYlZkFzPpM-QfeoIsa75SV2xtWy6w2-xapvJ_B-UZcYqwhWRb5osIdQhrJIbGti0yXFyjYc5o08_iGbZ91Q",
//             notification: {
//                 title: "this is title",
//                 body: "this is body"
//             }
//         })
//         console.log("Notification send successfully.....!!!!!")
//     } catch (error) {
//         console.log('error', error)
//     }

// }

// setTimeout(() => {
//     sendNotification()
// }, 2000)

// Start the server
app.listen(port, () => {
    console.log(`Server is listening at http://localhost:${port}`);
});
