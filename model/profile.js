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

    color: {
        type: String,
        default: 'none'
    },

    bold: {
        type: Boolean,
        default: false
    },

    spaceBetweenRank: {
        type: Boolean,
        default: false
    },

    italic: {
        type: Boolean,
        default: false
    },

    privateMessages: {
        type: Boolean,
        default: true
    },

    privateMessagesSound: {
        type: Boolean,
        default: true
    },

    ignoreList: {
        type: Array,
        default: []
    },

    allowDisguise: {
        type: Boolean,
        default: false
    },

    prefixes: {
        type: Array,
        default: []
    },

    activePrefix: {
        type: String,
        default: "none"
    }
});

module.exports = mongoose.model('profiles', scheme);