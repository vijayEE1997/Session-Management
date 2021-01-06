//Prebuild Requirement
const chalk = require('chalk')
const express = require('express')
const router = new express.Router();

//Custem Requirement
const session = require('../Middlewares/Session')
const auth = require('../Middlewares/Auth')
const userController = require('../Controllers/User')

//api to register
router.post('/register', userController.register)

router.use(session)

//api to login
router.post('/login',userController.login)

//api to logout
router.post('/logout', auth, userController.logout)

//api to logoutAll
router.post('/logoutAll', auth, userController.logoutAll)

//api to profile
router.get('/profile', auth, userController.profile)

module.exports = router