const express = require('express')
const authController = require('../controllers/AuthController')
const authRouter = express.Router()

// create a user
authRouter.post('/signup',authController.signup)

// sign in
authRouter.post('/signin', authController.signin)

// login with google
// authRouter.post('/google', googleAuth)

module.exports = authRouter