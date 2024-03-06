const mongoose = require('mongoose');

// Define schema and model
const deviceSchema = new mongoose.Schema({
    deviceId: { type: String, required: true, unique: true },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Device', deviceSchema);
