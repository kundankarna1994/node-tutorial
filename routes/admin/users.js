const express = require("express");
const UserController = require("../../controllers/UserController");
const { store, update, _delete } = require("../../validations/UserValidation");

const router = express.Router();
router
    .route("/users")
    .get(UserController.index)
    .post(store, UserController.store)
    .patch(update, UserController.update)
    .delete(_delete, UserController._delete);

module.exports = router;
