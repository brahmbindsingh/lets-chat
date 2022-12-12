const mongoose = require('mongoose');

exports.connectToMongo = async () => {
    mongoose.connect(process.env.DB_URL, () => {
        console.log("db connected");
    })
}