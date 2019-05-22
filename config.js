module.exports = {
    privateKey: process.env.PRIVATE_KEY,
    email: {
        login: process.env.EMAIL_LOGIN,
        password: process.env.EMAIL_PASSWORD,
        send: false
    },
    dbHost: process.env.DB_HOST
}