import dotenv from "dotenv";
dotenv.config();

const config = {
    privateKey: process.env.JWT_PRIVATE_KEY,
    email: {
        login: process.env.EMAIL_LOGIN,
        password: process.env.EMAIL_PASSWORD,
        send: true
    },
    siteUrl: process.env.SITE_URL,
    dbHost: process.env.DB_HOST
}

export default config;