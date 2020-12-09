const userModel = require('../Models/User')
const jwt = require('jsonwebtoken')

const auth = async (req,res,next) => {

    try{
        const token = req.header('Authorization').replace('Bearer ','')
        const decode = jwt.verify(token,process.env.JWT_SECRET)
        const user = await userModel.findOne({_id:decode._id,'tokens.token':token})

        if(!user){
            throw new Error()
        }

        req.user = user
        req.token = token
        
    next()
    }
    catch(error){
        res.status(400).send({error:"Plz login"})
    }
}

module.exports = auth