const bcrypt = require('bcrypt')
const { encode } = require('../services')
const { getToken } = require('../services/index')
const conexion = require('../database/db')
const { codes } = require('../utils/responses.js')

exports.findAll = (req, res) => {
    const offset = req.query.offset
    conexion.query(`SELECT * FROM users ORDER BY userId ASC LIMIT ${offset}`, (err, rows) => {
        if(err) res.send(err)
        res.send(rows)
    })
}

exports.getUsername = (req, res) => {
    const username = req.params.username
    if(req.username === username || req.admin){
        conexion.query(`SELECT * FROM users WHERE username = ?`, [username], (err, rows) => {
                if(err) res.send(codes[0].NotFound)
                res.status(200).send(rows)
            })
    }else{
        res.status(403).send(codes[0].Unauthorized)
    }
}

exports.create = async (req, res) => {
    const { username, nameAndSurname, email, phone, address, password } = req.body
    const passwordCrypted = await encode(password)

    // Sevenn is the owner of Delilah Resto
    let isAdmin = username === 'sevenn' ? true : false

    if(username && nameAndSurname && email && phone && address && password){
        conexion.query(`INSERT INTO users (userId, username, nameAndSurname, email, phone, address, password, isAdmin) VALUES(NULL, ?, ?, ?, ?, ?, ?, ?)`, [username, nameAndSurname, email, phone, address, passwordCrypted, isAdmin], (err, state) => {
            if(err) {
                if(err.errno === 1062){
                    res.send({
                        message: "El usuario ya existe."
                    })
                }
            }else if(state.serverStatus === 2){
                res.send(codes[0].Created)
            }else{
                res.sendStatus(202)
            }
        })
    }else{
        res.send({
            status: 400,
            error: "Hay campos incompletos."
        })
    }
}

exports.delete = (req, res) => {
    const id = req.params.id

    // I delete first the userId that it references in Orders to delete the user in users's table.
    conexion.query(`DELETE FROM orders WHERE user_id = ${id}`, (err, state) => {
        if(err){
            console.log(err)
            if(err.errno === 1054){
                res.status(400).send(codes[0].BadRequest)
            }else{
                res.status(500).send(codes[0].InternalServerError)
            }
        }
        conexion.query(`DELETE FROM users WHERE userId = ${id}`, (err, state) => {
            if(err) res.send(err)
            if(state.affectedRows === 1){
                res.status(201).send({
                    status: codes[0].Created,
                    elements_deleted: state.affectedRows
                })
            }else{
                res.status(404).send({
                    message: codes[0].NotFound
                })
            }
        })
    })
}

exports.login = async (req, res) => {
    const { username, password } = req.body
    let passwordSaved;
    let isAdmin;

    conexion.query('SELECT * FROM users WHERE username = ?', [username], (err, rows) => {
        if(err){
            res.send(err)
        }
        let exits = rows.length === 1 ? true : false
        if(exits){
            passwordSaved = rows[0].password
            isAdmin = rows[0].isAdmin
            getAccess()
        }else{
            res.status(404).send({
                message: "El usuario no existe o fue eliminado."
            })
        }
    })
    const getAccess = () => {
        bcrypt.compare(password, passwordSaved, function(err, areEqual) {
            if(err){
                return err
            }else if(areEqual){
                res.status(200).send({
                    token: getToken({
                        username: username,
                        isAdmin: isAdmin
                    }),
                    expiresIn: "30 minutes.",
                    status: codes[0].Ok
                })
            }else{
                res.status(403).send({
                    message: "La contraseña ingresada es invalida."
                })
            }
        })
    }
    
}

exports.giveManagement = (req, res) => {
    const { isAdmin, username } = req.body
    conexion.query(`UPDATE users SET isAdmin = ? WHERE username = ?`, [isAdmin, username], (err, rows) => {
        if(err) res.status(500).send({
            message: codes[0].InternalServerError
        })
        if(rows.affectedRows === 1){
            res.status(201).send({
                message: codes[0].Created
            })
        }else{
            res.status(404).send({
                message: codes[0].NotFound
            })
        }
    })
}

