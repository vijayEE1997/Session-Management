
const chalk = require('chalk')
const redis = require('ioredis')

//Configure Redis
const redisClient = redis.createClient({
    port:6379,
    host:'localhost'
})

redisClient.on('connect',()=>{
    console.log(chalk.green("Successfully connected to "+chalk.yellow("Redis")))
})

module.exports = redisClient