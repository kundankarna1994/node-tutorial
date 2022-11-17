const path = require("path");
const fs = require("fs");
const handleBars = require("handlebars");

const registration_template = (user) => {
    const template = path.join(
        __dirname,
        "..",
        "templates",
        "registration.html"
    );
    console.log(template);
    const source = fs.readFileSync(template, "utf-8").toString();
    const handle = handleBars.compile(source);
    const replacements = {
        name: user.name,
    };
    return handle(replacements);
};

module.exports = registration_template;
