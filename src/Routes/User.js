//Prebuild Requirement
const chalk = require('chalk')
const express = require('express')
const router = new express.Router();

//Custem Requirement
const userModel = require('../Models/User')

//api to register
router.post('/register', async (req, res) => {

    const user = new userModel(req.body)
    
    try{
        const checkEmail = await userModel.findOne({email:user.email})
        if(checkEmail!==null)
        throw new Error("Email already Exists")
        await user.save()
        res.status(201).send("Added Successfully")
    }
    catch(error){
        res.status(400).send(error.message)
    }
    
})

module.exports = router