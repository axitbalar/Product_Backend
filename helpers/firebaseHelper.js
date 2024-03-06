const admin = require('firebase-admin');

const serviceAccount = require('../serviceAccountKey.json'); // Update with your service account key path

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

const sendNotificationToAllDevices = async (registrationTokens, message) => {
    try {
        const payload = {
            notification: {
                title: 'Testing',
                body: message
            }
        };

        const response = await admin.messaging().sendToDevice(registrationTokens, payload);
        console.log('Notification sent successfully:', response);
    } catch (error) {
        console.error('Error sending notification:', error);
        throw error;
    }
};

module.exports = {
    sendNotificationToAllDevices
};
