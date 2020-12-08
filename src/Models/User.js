const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')

const userSchema = new mongoose.Schema( {
    firstName: {
        type: String,
        required: true,
        trim:true
    },
    lastName: {
        type: String,
        required: true,
        trim:true
    },
    mobile: {
        type: Number,
        required: true,
        validate(value){
            if (value.toString().length!==10)
            throw new Error('Invalid Mobile Number')
        }
    },
    email: {
        type: String,
        required: true,        
        unique:true,
        trim:true,
        lowercase:true,
        validate(value) {
            if (!validator.isEmail(value))
                throw new Error('Invalid Email ID')
        }
    },
    password: {
        type: String,
        required: true
    }
})

//Middleware before SAVE 
userSchema.pre('save', async function (next){

    const user = this

    if(user.isModified('password')){
        user.password = await bcrypt.hash(user.password,8)
    }

    next()
})

const User = mongoose.model('User',userSchema)

module.exports = User