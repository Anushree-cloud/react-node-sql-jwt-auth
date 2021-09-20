const express = require('express')
const authRouter = express.Router()
const Auth = require('../controllers/auth')
const Tokens = require('../tokens/jwtokens')

authRouter.post('/login', Auth.login)

authRouter.get('/profile', Tokens.validateToken)

module.exports = authRouter