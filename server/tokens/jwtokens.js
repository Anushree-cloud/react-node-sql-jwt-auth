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
        console.log(validToken);
        console.log(accessToken)
        if(validToken){
            req.authenticate = true
            res.json({
                token: accessToken
            })
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