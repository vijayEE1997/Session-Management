const userModel = require('../Models/User')

const register = async (req, res) => {

    const user = new userModel(req.body)

    try {
        const checkEmail = await userModel.findOne({ email: user.email })
        if (checkEmail !== null)
            throw new Error("Email already Exists")

        await user.save()
        res.status(201).send(user)
    }
    catch (error) {
        res.status(400).send(error.message)
    }

}

const login = async (req, res) => {
    try {
        const user = await userModel.findByCredentials(req.body.email, req.body.password)
        const token = await user.generateAuthToken()

        req.session.userEmail = user.email
        req.session.sessionId = token

        res.status(200).send({ user, token })
    }
    catch (error) {
        res.status(400).send(error.message)
    }

}

const logout = async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) => token.token !== req.token)
        await req.user.save()
        req.session.destroy(function (err) {
        })
        res.clearCookie('sessionCookie')
        res.status(200).send()
    }
    catch (error) {
        res.status(400).send(error.message)
    }

}

const logoutAll = async (req, res) => {
    try {
        req.user.tokens = []
        await req.user.save()
        req.session.destroy(function (err) {
        })
        res.clearCookie('sessionCookie')
        res.status(200).send()
    }
    catch (error) {
        res.status(400).send(error.message)
    }

}

const profile = async (req, res) => {
    res.status(200).send(req.user)
}

module.exports = {
    register,
    login,
    logout,
    logoutAll,
    profile
}