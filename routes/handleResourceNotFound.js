const express = require("express");

const router = express.Router();
router.all("*", (req, res) => {
    res.send("REsource not found");
});

module.exports = router;
