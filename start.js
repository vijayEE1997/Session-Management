//Prebuild Requirement
const chalk = require('chalk')
const express = require('express')

//To get access to .env file (Environment variables)
require('dotenv').config()

//Custem Requirement
const connectMongo = require('./src/config/Mongoose')
const userRoutes = require('./src/Routes/User')
const corsAllow = require('./src/config/CorsAllow')

let port = process.env.PORT||5000

const app = express()               //Creating instance of express

app.use(express.json())             //To recognize the incoming Request Object as a JSON Object //Express Middleware
app.use(corsAllow)
app.use('/user',userRoutes)         //Routes for User                                           //Express Middleware

//Setting up the Port
app.listen(port,()=>{
    console.log(chalk.yellow("Server is listening to "+port))
})

