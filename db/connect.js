const mongoose = require('mongoose')

const connectDB = (url) => {
    console.log("db connected")
    return mongoose.connect(url)
}

module.exports = connectDB