//https://nodemailer.com/usage/
const nodemailer = require("nodemailer");

//configure transporter
const transporter = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    auth: {
        user: process.env.MAIL_USERNAME,
        pass: process.env.MAIL_PASSWORD,
    },
});

//send mail function
const sendEmail = async (to, subject, template) => {
    // trasnporter.sendmail does not return promies so used new Promise
    return new Promise((resolve, reject) => {
        const options = {
            from: process.env.MAIL_FROM || "noreply@domain.com",
            to: to,
            subject: subject,
            html: template,
        };
        transporter.sendMail(options, (err, info) => {
            if (err) {
                resolve(false);
                console.log(err);
            } else {
                console.log("Email Sent : ", info.response);
                resolve(true);
            }
        });
    });
};

module.exports = sendEmail;
