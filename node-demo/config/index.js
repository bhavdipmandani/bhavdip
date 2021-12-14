module.exports = {
    env: process.env.ENV,
    JWT :{
      secret: process.env.JWT_SECRET_KET
    },
    server: {
        port: process.env.SERVER_PORT,
    },
    mongo: {
        dbHost: process.env.DB_HOST,
        dbPort: process.env.DB_PORT,
        dbName: process.env.DB_NAME,
        dbUser: process.env.DB_USER,
        dbPass: process.env.DB_PASS,
    }
}
