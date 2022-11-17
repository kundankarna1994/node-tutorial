const express = require("express");
const LoginController = require("../../controllers/LoginController");
const { login } = require("../../validations/LoginValidation");

const router = express.Router();
router.route("/login").post(login, LoginController.login);

module.exports = router;
