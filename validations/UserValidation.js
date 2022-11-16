const { check, validationResult } = require("express-validator");
const Model = require("../models/User");

const store = [
    check("email")
        .trim()
        .normalizeEmail()
        .not()
        .isEmpty()
        .withMessage("Invalid email address!")
        .bail()
        .custom(async (value) => {
            const model = await Model.findOne({ email: value });
            if (model) {
                return Promise.reject("E-mail already in use");
            }
        }),
    check("name")
        .trim()
        .escape()
        .not()
        .isEmpty()
        .withMessage("User name can not be empty!")
        .bail()
        .isLength({ min: 3 })
        .withMessage("Minimum 3 characters required!")
        .bail(),
    check("password")
        .trim()
        .not()
        .isEmpty()
        .isLength({ min: 6 })
        .withMessage("Invalid Password")
        .bail(),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }
        next();
    },
];

const update = [
    check("email").not().isEmpty().withMessage("Invalid email address!").bail(),
    check("id")
        .not()
        .isEmpty()
        .isMongoId()
        .isString()
        .custom(async (value) => {
            const model = await Model.findById(value);
            if (!model) {
                return Promise.reject("Record Not Found");
            }
        })
        .custom(async (value, { req }) => {
            const { email } = req.body;
            const model = await Model.findOne({ email }).where("_id").ne(value);
            if (model) {
                return Promise.reject("E-mail already in use");
            }
        }),
    check("name")
        .trim()
        .escape()
        .not()
        .isEmpty()
        .withMessage("User name can not be empty!")
        .bail()
        .isLength({ min: 3 })
        .withMessage("Minimum 3 characters required!")
        .bail(),

    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }
        next();
    },
];

const _delete = [
    check("id")
        .isMongoId()
        .custom(async (value) => {
            const model = await Model.findById(value);
            if (!model) {
                return Promise.reject("Record Not Found");
            }
        }),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }
        next();
    },
];
module.exports = { store, update, _delete };
