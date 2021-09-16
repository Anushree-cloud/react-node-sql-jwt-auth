const express = require('express')
const authRouter = express.Router()
const Auth = require('../controllers/auth')

authRouter.post('/login', Auth.login)

module.exports = authRouter