const mongoose = require('mongoose');

const scheme = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },

    priority: {
        type: Number,
        required: true
    },

    color: {
        type: String,
        default: 'WHITE'
    },

    bold: {
        type: Boolean,
        default: false
    },

    italic: {
        type: Boolean,
        default: false
    },

    prefix: {
        type: String,
        default: ''
    },

    suffix: {
        type: String,
        default: ''
    },

    defaultRank: {
        type: Boolean,
        default: false
    },

    permissions: {
        type: Array,
        default: []
    }
})

module.exports = mongoose.model('ranks', scheme);