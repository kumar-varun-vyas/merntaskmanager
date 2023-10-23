const express = require('express')

const authRouter = express.Router()

const authController = require('../controllers/authController')

authRouter.post('/register', authController.register)
authRouter.post('/signin', authController.signin)

module.exports = authRouter;