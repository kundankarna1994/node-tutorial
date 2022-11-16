const path = require("path");

const ADMIN_ROUTE_PREFIX = process.env.ADMIN_ROUTE_PREFIX || "admin";
const ROUTE_CONFIG = {
    admin: {
        FOLDER: path.join(__dirname, "..", "routes", "admin"),
        PREFIX: "/" + ADMIN_ROUTE_PREFIX,
    },
};

module.exports = ROUTE_CONFIG;
