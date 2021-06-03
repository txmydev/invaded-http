const mongoose = require('mongoose');

const scheme = new mongoose.Schema({
    type: {
        type: String,
        default: "NONE"
    },

    punishedAt: {
        type: Number,
        default: 0
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
        default: ""
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