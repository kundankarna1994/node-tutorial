const DB_URI = `mongodb://localhost:27017/node`;
const mongoose = require("mongoose");

const DB_CONNECTION = async () => {
    try {
        await mongoose.connect(DB_URI);
    } catch (err) {
        console.log(err);
    }
};

module.exports = DB_CONNECTION;
