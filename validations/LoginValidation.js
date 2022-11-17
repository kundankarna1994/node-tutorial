const { check, validationResult } = require("express-validator");
const login = [
    check("email")
        .trim()
        .normalizeEmail()
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
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }
        next();
    },
];
module.exports = { login };
