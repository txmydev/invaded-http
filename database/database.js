const mongoose = require('mongoose');

module.exports = {
    connect: () => mongoose.connect("mongodb://asuma1:almo12@45.132.89.30:27017/admin", { useNewUrlParser: true }, (err) => {
        if(err) console.log(err)
        else console.log('Connected to the database.')
    })
}