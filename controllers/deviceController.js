const Device = require('../models/device');
const Token = require('../models/token');
const { firebase } = require("../firebase/index")

// Controller functions
const addDevice = async (req, res) => {
    try {
        const { deviceId } = req.body;
        const newDevice = new Device({ deviceId });
        await newDevice.save();
        res.status(201).json({ message: 'Device ID stored successfully' });
    } catch (error) {
        if (error.code === 11000) {
            // Duplicate key error, deviceId already exists
            res.status(400).json({ message: 'Device ID already exists' });
        } else {
            console.error(error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }
};

const addToken = async (req, res) => {
    try {
        const { token } = req.body;
        const newDevice = new Token({ token });
        await newDevice.save();
        res.status(201).json({ message: 'Token stored successfully' });
    } catch (error) {
        if (error.code === 11000) {
            // Duplicate key error, deviceId already exists
            res.status(400).json({ message: 'Token already exists' });
        } else {
            console.error(error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }
};

const sendNotofication = async (req, res) => {
    try {
        const { title, body } = req.body
        const tokens = await Token.find({}, 'token');
        const deviceTokens = tokens.map(tokenDoc => tokenDoc.token);

        const notifications = deviceTokens.map(token => ({
            token: token,
            notification: {
                title: title,
                body: body
            }
        }));

        const sendResults = await Promise.all(
            notifications.map(notification =>
                firebase.messaging().send(notification)
            )
        );

        // await firebase.messaging().send({
        //     token: "cLZYkTaHTT65rvYDscOSGy:APA91bG7uqtJJcnsjkArIXgL3O-AkEnSKuYdrk7AYze-Qdcuw1V23AC4NxYlZkFzPpM-QfeoIsa75SV2xtWy6w2-xapvJ_B-UZcYqwhWRb5osIdQhrJIbGti0yXFyjYc5o08_iGbZ91Q",
        //     notification: {
        //         title: title,
        //         body: body
        //     }
        // })
        res.status(201).json({ message: 'Notification send successfully.....!!!!!' });
        // console.log("Notification send successfully.....!!!!!")
    } catch (error) {
        console.log('error', error)
    }
}

// const sendNotification = async (req, res) => {
//     try {
//         const message = req.body.message; // Assuming the message is sent in the request body

//         // Retrieve all device IDs from MongoDB
//         const devices = await Device.find({}, { deviceId: 1, _id: 0 });
//         const registrationTokens = devices.map(device => device.deviceId);

//         // Send notifications to all devices
//         await sendNotificationToAllDevices(registrationTokens, message);

//         res.status(200).json({ message: 'Notification sent successfully' });
//     } catch (error) {
//         console.error('Error sending notification:', error);
//         res.status(500).json({ message: 'Internal server error' });
//     }
// };


module.exports = {
    addDevice,
    // sendNotification,
    addToken,
    sendNotofication
};
