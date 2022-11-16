const mongoose = require("mongoose");

const schema = new mongoose.Schema(
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

const User = mongoose.model("User", schema);
module.exports = User;
