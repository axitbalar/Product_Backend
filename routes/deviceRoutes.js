const express = require('express');
const deviceController = require('../controllers/deviceController');

const router = express.Router();

// Define routes
router.post('/devices', deviceController.addDevice);
router.post('/sendNotification', deviceController.sendNotification);

module.exports = router;
