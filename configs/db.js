const DB_URI = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.krbv9nl.mongodb.net/?retryWrites=true&w=majority`;
const mongoose = require("mongoose");

const DB_CONNECTION = async () => {
    try {
        await mongoose.connect(DB_URI);
    } catch (err) {
        console.log(err);
    }
};

module.exports = DB_CONNECTION;
