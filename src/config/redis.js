
const redis = require('redis')

//Configure Redis
const redisClient = redis.createClient({
    port:6379,
    host:'localhost'
})

module.exports = redisClient