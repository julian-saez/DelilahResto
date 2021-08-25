const { JWT_TOKEN } = require("../config")
const jwt = require('jsonwebtoken')
const conexion = require('../database/db')

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

const verifyId = (req, res, next) => {
    conexion.query('SELECT username FROM users WHERE userId = ?', [req.params.id], (err, rows) => {
        if(err){
            req.match = false
            next()
        }  
        let isNull = rows.length === 0 ? true : false
        
        if(isNull){
            req.match = false
            next()
        }else{
            if(rows[0].username === req.username){
                req.match = true
                next()
            }else{
                req.match = false
                next()
            }
        }
    })
}

module.exports = {
    verifyToken,
    verifyRol,
    verifyId
}