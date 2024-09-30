const mongoose = require('mongoose');

const adSchema = new mongoose.Schema({
    title: { type: String, required: true },
    link: { type: String, required: true },
    imageUrl: { type: String, required: true },
});

module.exports = mongoose.model('Ad', adSchema);
