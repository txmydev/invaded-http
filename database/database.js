const mongoose = require('mongoose');

module.exports = {
    connect: () => mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true }, () => console.log('Connected to the database.'))
}