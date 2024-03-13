const mongoose = require('mongoose');

// Define schema and model
const tokenSchema = new mongoose.Schema({
    token: { type: String, required: true, unique: true },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Token', tokenSchema);
