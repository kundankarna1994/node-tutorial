const { check, validationResult } = require("express-validator");
const Model = require("../models/User");
const login = [
    check("email")
        .trim()
        .not()
        .isEmpty()
        .withMessage("Invalid email address!")
        .bail(),
    check("password")
        .trim()
        .not()
        .isEmpty()
        .isLength({ min: 6 })
        .withMessage("Invalid Password"),
    async (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }
        next();
    },
];
module.exports = { login };
