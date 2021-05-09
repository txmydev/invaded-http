const mongoose = require('mongoose');

const scheme = new mongoose.Schema({
    id: {
        type: String,
        required: true
    },

    display: {
        type: String,
        default: ""
    }
})

module.exports = mongoose.model('prefixs', scheme)