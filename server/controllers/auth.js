const Users = require('../models/users')
const Tokens = require('../tokens/jwtokens')

exports.login = (req, res) => {
    let currentUser = {
        email: req.body.email,
        password: req.body.password
    }
    // let session = req.session.currentUser
    Users.getByUserNamePassword(currentUser, (user) => {
        if(user.length) {
            const accessToken = Tokens.createToken(user[0])
            res.cookie("access-token", accessToken, {
                maxAge: 60 * 60 * 24 * 365 //one year
            })
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

exports.profile = (req, res) => {
    res.json({
        message: "Users Profile."
    })
}