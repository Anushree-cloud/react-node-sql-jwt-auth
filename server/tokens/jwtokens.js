const jwt = require('jsonwebtoken')


exports.createToken = (data) => {
    let accessToken = jwt.sign({ email: data.email, id: data.id}, "jwtSecret")
    return accessToken
}

exports.validateToken = (req, res, next) => {
    let accessToken = req.cookies["access-token"]

    if(!accessToken){
        return res.json({
            data: {
                message: "User not Authenticated!"
            }
        })
    }

    try {
        let validToken = jwt.verify(accessToken, "jwtSecret")
        if(validToken){
            req.authenticate = true
            return next()
        }
    } catch (error) {
        res.json({
            data: {
                message: error
            }
        })
    }
}