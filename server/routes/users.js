const express = require('express')
const userRouter = express.Router()
const User = require('../controllers/users')

userRouter.get('/users', User.getAllUsers)

userRouter.get('/users/:userId', User.getSingleUser)

userRouter.post('/users', User.register)

userRouter.put('/users/:userId', User.updateUser)

userRouter.delete('/users/:userId', User.deleteUser)

module.exports = userRouter