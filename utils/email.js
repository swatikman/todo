import nodeMailer from 'nodemailer';
import config from '../config';

const transporter = nodeMailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: config.email.login,
        pass: config.email.password
    }
});

export const sendEmail = (to, subject, htmlText) => {
    if (!config.email.send) {
        return Promise.resolve();
    }
    return new Promise((resolve, reject) => {

        const mailOptions = {
            from: `"Todo List" <${config.email.login}\>`,
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