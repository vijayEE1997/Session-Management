const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

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
    },
    tokens:[{
        token :{
            type: String,
            required:true
        }
    }]
})


//Generate Token
//userSchema.methods.getPublicProfile = function (){
userSchema.methods.toJSON = function (){

    const user = this
    const userObject = user.toObject()
    
    delete userObject.password
    delete userObject.tokens

    return userObject

}

//Generate Token
userSchema.methods.generateAuthToken = async function (){

    const user = this
    const token = jwt.sign({_id:user._id.toString()},process.env.JWT_SECRET)

    user.tokens = user.tokens.concat({token})
    await user.save()

    return token

}

//Middleware
userSchema.statics.findByCredentials = async (email,password) => {

    const user = await User.findOne({email})

    if(!user){
        throw new Error("Email not exists")
    }

    const isMatch = await bcrypt.compare(password,user.password)

    if(!isMatch){
        throw new Error("Invalid Credential")
    }

    return user

}

//Middleware (HASH PASWORD BEFORE SAVING)
userSchema.pre('save', async function (next){

    const user = this

    if(user.isModified('password')){
        user.password = await bcrypt.hash(user.password,8)
    }

    next()
})

const User = mongoose.model('User',userSchema)

module.exports = User