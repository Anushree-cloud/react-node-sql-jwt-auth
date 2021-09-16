const Users = require('../models/users')

exports.login = (req, res) => {
    let currentUser = {
        email: req.body.email,
        password: req.body.password
    }
    
    Users.getByUserNamePassword(req.session.currentUser, currentUser, (user) => {
        if(user.length) {
            res.json({
                data: {
                    message: `${user[0].name}, Logged in.`,
                    data: user
                }
            })
        }
        else {
            res.json({
                data: {
                    message: 'Invalid User or Password!'
                }
            })
        }
    })
} 