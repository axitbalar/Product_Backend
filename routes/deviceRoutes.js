const express = require('express');
const deviceController = require('../controllers/deviceController');
const dataController = require("../controllers/dataController")

const router = express.Router();

// Define routes
router.post('/devices', deviceController.addDevice);
// router.post('/sendNotification', deviceController.sendNotification);
router.post('/token', deviceController.addToken);
router.post('/send-notification', deviceController.sendNotification)

//data routes
router.get("/data", dataController.getData)

module.exports = router;
