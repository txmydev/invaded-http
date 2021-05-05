const mongoose = require('mongoose');

const scheme = new mongoose.Schema({
    type: {
        type: String,
        required: true
    },

    punishedAt: {
        type: Number,
        required: true
    },

    cheaterUuid: {
        type: String,
        required: true
    },

    cheaterName: {
        type: String,
        required: true
    },

    staffName: {
        type: String,
        required: true
    },

    reason: {
        type: String,
        default: ""
    },

    expire: {
        type: Number,
        default: 0
    },

    removedAt: {
        type: Number,
        default: 0
    },

    removedBy: {
        type: String,
        default: ""
    },

    silent: {
        type: Boolean,
        required: false
    }
})

module.exports = mongoose.model('activePunishment', scheme);