//configure dotenv
require("dotenv").config();
const express = require("express");
const fs = require("fs");
const process = require("process");
const authMiddleware = require("./middlewares/auth");
// get route config
const path = require("path");
const ROUTE_CONFIG = require(path.join(__dirname, "configs", "routes"));
const app = express();
// view config
app.set("views", "views");
app.set("view engine", "ejs");

//static files

app.use(express.static("public"));
// use express json parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//get db config
const DB_CONNECTION = require(path.join(__dirname, "configs", "db"));
const mongoose = require("mongoose");
DB_CONNECTION();

//load all admin routes dynamically
fs.readdir(ROUTE_CONFIG.admin.FOLDER, (err, files) => {
    if (!err) {
        files.forEach((file, inddex) => {
            const filePath = path.join(ROUTE_CONFIG.admin.FOLDER, file);
            fs.lstat(filePath, (err, stats) => {
                if (stats.isFile()) {
                    app.use(
                        ROUTE_CONFIG.admin.PREFIX,
                        authMiddleware,
                        require(filePath)
                    );
                }
            });
        });
    }
});
//load website routes
fs.readdir(ROUTE_CONFIG.website.FOLDER, (err, files) => {
    if (!err) {
        files.forEach((file, inddex) => {
            const filePath = path.join(ROUTE_CONFIG.website.FOLDER, file);
            fs.lstat(filePath, (err, stats) => {
                if (stats.isFile()) {
                    app.use(ROUTE_CONFIG.website.PREFIX, require(filePath));
                }
            });
        });
    }
});
const PORT = process.env.APP_PORT || 3500;

mongoose.connection.once("open", () => {
    app.listen(PORT, () => {
        console.log("App is listening on PORT", PORT);
    });
});
mongoose.connection.on("error", (err) => {
    console.log(err);
});
