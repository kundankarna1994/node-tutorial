const handler = (err, req, res, next) => {
    if (err) {
        if (req.accepts(["html", "json"]) === "json") {
            res.status(500).send({ message: "Internal Server Error" });
        } else {
            res.status(500).send("Internal Server Error");
        }
    }
    next();
};

module.exports = handler;
