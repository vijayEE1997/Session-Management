const session = require('express-session')
const connectRedis = require('connect-redis')
const redisClient = require('../config/redis')

const redisStore = connectRedis(session)

const inprod = process.env.NODE_ENV === 'production'
//configure session middleware
session({
    name: "Cookie-SID",
    key: 'user_sid',
    store: new redisStore({ client: redisClient }),
    secret: 'mysecret',
    saveUninitialized: false,
    resave: false,
    cookie: {
        secure: inprod,//for production true
        sameSite: true,
        maxAge: 1000 * 60 * 30 //half hour
    }
})

module.exports = session