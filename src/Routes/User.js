//Prebuild Requirement
const chalk = require('chalk')
const express = require('express')
const router = new express.Router();

//Custem Requirement
const userModel = require('../Models/User')
const auth = require('../Middlewares/Auth')

//api to register
router.post('/register',async (req, res) => {

    const user = new userModel(req.body)
    
    try{
        const checkEmail = await userModel.findOne({email:user.email})
        if(checkEmail!==null)
        throw new Error("Email already Exists")

        await user.save()
        res.status(201).send(user)
    }
    catch(error){
        res.status(400).send(error.message)
    }
    
})

//api to login
router.post('/login', async (req, res) => {    
    try{
        const user = await userModel.findByCredentials(req.body.email,req.body.password)
        const token = await user.generateAuthToken()

        req.session.clientId = 'hey'
        req.session.myNum='5'
        res.status(200).send({user,token})
    }
    catch(error){
        res.status(400).send(error.message)
    }
    
})

//api to logout
router.post('/logout',auth , async (req, res) => {    
    try{
        req.user.tokens = req.user.tokens.filter((token) => token.token !== req.token)
        await req.user.save()
        res.status(200).send()
    }
    catch(error){
        res.status(500).send(error.message)
    }
    
})

router.post('/logoutAll',auth , async (req, res) => {    
    try{
        req.user.tokens = []
        await req.user.save()
        res.status(200).send()
    }
    catch(error){
        res.status(500).send(error.message)
    }
    
})

//api to profile
router.get('/profile',auth , async (req, res) => {    
    res.status(200).send(req.user)
})
module.exports = router