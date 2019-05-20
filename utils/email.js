const nodeMailer = require('nodemailer');
const url = require('url');
const config = require('./../config');

module.exports.sendEmail = (to, subject, htmlText) => {
    if (config.email.notSend) {
        return Promise.resolve();
    }
    return new Promise((resolve, reject) => {
        let transporter = nodeMailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
                user: config.email.login,
                pass: config.email.password
            }
        });
        let mailOptions = {
            from: '"Todo List" <chyzh.sviatoslav@gmail.com>',
            to: to,
            subject: subject,
            html: htmlText
        };
    
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return reject(error);
            }
            resolve(info);
        });
    });
}

module.exports.getCurrentUrl = (req) => {
    return url.format({
        protocol: req.protocol,
        host: req.get('host'),
        pathname: req.originalUrl
    });
}


