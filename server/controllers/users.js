const Users = require('../models/users')

exports.getAllUsers = (req, res) => {
    Users.getAll((users) => {
        res.json({
            data: {
                message: 'All Users Fetched..!',
                data: users
            }
        })
    })
}

exports.getSingleUser = (req, res) => {
    let userId = req.params.userId
    Users.getById(userId, (user) => {
        if(user.length){
            res.json({
                data: {
                    message: `User Fetched with id: ${userId}.`,
                    data: user
                }
            })
        }
        else{
            res.json({
                message: `User with id:${userId} Not found..!`
            })
        }
        
    })
}

exports.register = (req, res) => {
    let newUser = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    }
    Users.register(newUser, () => {
        res.json({
            data: {
                message: `New User ${req.body.name}, Added..!`,
                data: newUser
            }
        })
    })
}

exports.updateUser = (req, res) => {
    let userId = req.params.userId
    Users.getById(userId, (user) => {
        if(user.length){
            let updatedUser = {
                id: user.id,
                name: req.body.name ? req.body.name : user.name,
                email: req.body.email ? req.body.email : user.email,
                password: req.body.password ? req.body.password : user.password
            }
            Users.updateById(updatedUser, userId, () => {
                res.json({
                    data: {
                        message: `User Details Updated with id: ${userId}`,
                        data: updatedUser
                    }
                })
            })
        }
        else{
            res.json({
                message: `User with id:${userId} Not found..!`
            })
        }
        
    })
}

exports.deleteUser = (req, res) => {
    let userId = req.params.userId
    Users.deleteById(userId, () => {
        res.json({
            data: {
                message: `User Deleted with id: ${userId}`
            }
        })
    })
}