const Model = require("../models/User");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const User = require("../models/User");
const sendMail = require("../configs/mail");
const registration_template = require("../helpers/resgitration");

const index = asyncHandler(async (req, res) => {
    const records = await User.find().select("-select").lean();
    res.status(200).json({ records });
});

const store = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const modelObj = { name, email, password: hashedPassword };
    const model = await Model.create(modelObj);
    const template = registration_template(model);
    await sendMail(model.email, "Welcome To Node Tutorial", template);
    res.status(201).json({ message: "New Record Created Successfully" });
});

const update = asyncHandler(async (req, res) => {
    const { id, name, email } = req.body;
    await Model.findByIdAndUpdate(id, { name, email });
    res.status(201).json({ message: "New Record Updated Successfully" });
});

const _delete = asyncHandler(async (req, res) => {
    const { id } = req.body;
    await Model.findByIdAndDelete(id);
    res.status(200).json({ message: "Record Deleted Successfully" });
});

const mail = asyncHandler(async (req, res) => {
    const model = await Model.findOne({}).exec();

    console.log(html);
    res.send(model);
});
module.exports = {
    index,
    store,
    update,
    _delete,
    mail,
};
