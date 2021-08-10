const { JWT_TOKEN } = require("../config")
const jwt = require('jsonwebtoken')

const verifyToken = (req, res, next) => {
    const bearerHeader = req.headers['authorization'];
    if(typeof bearerHeader !== 'undefined'){
        const bearerToken = bearerHeader.split(' ')[1]
        req.token = bearerToken
        jwt.verify(bearerToken, JWT_TOKEN, (err, auth) => {
            if(err){
                res.sendStatus(401)
            }else{
                // Closure to take this value in VerifyRol 
                req.admin = auth.isAdmin 
                req.username = auth.username
                next()
            }
        })
    }else{
        res.sendStatus(401)
    }
}

const verifyRol = (req, res, next) => {
    if(req.admin){
        next()
    }else{
        res.sendStatus(401)
    }
}

module.exports = {
    verifyToken,
    verifyRol
}