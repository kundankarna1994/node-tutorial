const Model = require("../models/User");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");

const login = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const user = await Model.findOne({
        email: email,
    }).exec();
    if (!user || !bcrypt.compare(password, user.password)) {
        res.status(400).json({ message: "Invalid Credentials" });
    }
    const token = user.generateAuthToken(user);
    res.header("x-auth-token", token).send({
        token: token,
        _id: user.id,
        name: user.name,
        email: user.email,
    });
});

module.exports = {
    login,
};
