//Prebuild Requirement
const chalk = require('chalk')
const express = require('express')

//To get access to .env file (Environment variables)
require('dotenv').config()

//Custem Requirement
const connectMongo = require('./src/config/mongoose')
const userRoutes = require('./src/Routes/User')

let port = process.env.PORT||5000

//Creating instance of express
const app = express()

//To recognize the incoming Request Object as a JSON Object
//Middleware of express
app.use(express.json())

//Middleware Routes for User
app.use(userRoutes)


//Setting up the Port
app.listen(port,()=>{
    console.log(chalk.yellow("Server is listening to "+port))
})

