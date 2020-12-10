const userModel = require('../Models/User')
const jwt = require('jsonwebtoken')
const { strikethrough } = require('chalk')

const auth = async (req,res,next) => {

    try{
        
        if(!req.session)
        {
            next(new Error("Please Login"))
        }
        else if(!req.session.sessionId)
        {
            next(new Error("Session-Expired"))
        }
        // const token = req.header('Authorization').replace('Bearer ','')
        const token = req.session.sessionId
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
        res.status(400).send({error:"Please Login"})
    }
}

module.exports = auth