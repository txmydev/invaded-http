const mongoose = require('mongoose');

const scheme = new mongoose.Schema({
    uuid: {
        type: String,
        required: true
    },

    name: {
        type: String,
        required: true
    },

    rank: {
        type: String,
        required: true
    },

    addedAt: {
        type: Number,
        required: true
    },

    addedBy: {
        type: String,
        required: true
    },

    removedBy: {
        type: String,
        default: ''
    },

    removedAt: {
        type: Number,
        default: 0
    }

})

module.exports = mongoose.model('grants', scheme);