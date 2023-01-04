const mongoose = require('mongoose');
const mongoUri = process.env.MONGODB_URL || 'mongodb+srv://udayrana428:surendra@cluster0.px7ut.mongodb.net/ecommerce'
// const mongoUri = 'mongodb://localhost:27017/inotebook'
const dance="hello"
const connectToMongo = () => {
    mongoose.connect(mongoUri, () => {
        console.log("connection was successfully implied")
    });
}

module.exports = connectToMongo