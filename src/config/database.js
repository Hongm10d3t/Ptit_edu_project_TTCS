require('dotenv').config();
const mongoose = require('mongoose');

const connection = async () => {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/ptitedu');
        console.log("connect to db")

    } catch (error) {
        console.log(">>>> Error connection DB:", error)
    }
}
module.exports = connection;