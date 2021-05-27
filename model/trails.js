const mongoose = require('mongoose');

const scheme = new mongoose.Schema({
    id: {
        type: String,
        required: true
    },

    display: {
        type: String,
        default: ""
    },

    price: {
        type: Number,
        default: 0
    }
})

module.exports = mongoose.model('trails', scheme)