const session = require('express-session');
const redisClient = require('../config/Redis');
let RedisStore = require('connect-redis')(session)
var dotenv = require('dotenv')

const { NODE_ENV = 'devolopment', } = process.env
const inprod = (NODE_ENV === 'production')
const domain = (NODE_ENV === 'production')?'.aidatabases.in':'localhost'

module.exports = session({
    name: "sessionCookie",
    key: 'sessionKey',
    store: new RedisStore({ host: process.env.REDIS_IP, port: process.env.REDIS_PORT, client: redisClient }),
    secret: process.env.REDIS_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60, // For an hour in miliseconds
        sameSite: true,
        secure: inprod,
        domain
    }
})