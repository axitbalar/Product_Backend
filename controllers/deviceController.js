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
        const newToken = new Token({ token });
        await newToken.save();
        res.status(201).json({ message: 'Token stored successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};


const sendNotification = async (req, res) => {
    try {
        const { title, body } = req.body;
        const tokens = await Token.find({}, 'token');

        const deviceMap = new Map();

        tokens.forEach(tokenDoc => {
            if (!deviceMap.has(tokenDoc.token)) {
                deviceMap.set(tokenDoc.token, {
                    token: tokenDoc.token,
                    notification: {
                        title: title,
                        body: body
                    }
                });
            }
        });

        const notifications = [...deviceMap.values()];

        const sendResults = await Promise.all(
            notifications.map(notification =>
                firebase.messaging().send(notification)
            )
        );

        res.status(201).json({ message: 'Notifications sent successfully!' });
    } catch (error) {
        console.log('Error:', error);
        res.status(500).json({ error: 'Failed to send notifications.' });
    }
};


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
    sendNotification
};
