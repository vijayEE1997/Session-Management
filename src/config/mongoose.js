const chalk = require('chalk')
const mongoose = require('mongoose')

mongoose.connect(process.env.DBPATH, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
}).then(()=>{
    console.log(chalk.green("Successfully connected to MongoDB"))
}).catch((error)=>{
    console.log(chalk.red(error))
    console.log("Unable to connect to MongoDB")
})


