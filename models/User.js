const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const process = require("process");

const Schema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: "Name is Required",
        },
        email: {
            type: String,
            unique: true,
            required: "Email Address is Required",
            lowercase: true,
        },
        email_verified_at: {
            type: Date,
        },
        password: {
            type: String,
            required: "Password is Required",
        },
    },
    {
        timestamps: true,
    }
);
Schema.methods.generateAuthToken = function () {
    const data = { _id: this._id, name: this.name };
    return jwt.sign(data, process.env.JWT_SECRET);
};
const User = mongoose.model("User", Schema);

module.exports = User;
