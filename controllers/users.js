const { Users, Orders } = require('../db/db')
const bcrypt = require('bcrypt')
const { encode } = require('../services')
const { getToken } = require('../services/index')
const { JWT_TOKEN } = require('../config')
const jwt = require('jsonwebtoken')

exports.findAll = (req, res) => {
    const queryParams = req.query
    Users.findAll({
        limit: parseInt(queryParams.limit),
        offset: parseInt(queryParams.offset),
        attributes: ['username', 'nameAndSurname', 'email', 'phone', 'address', 'IsAdmin']
    })
        .then(data => {
            res.status(200).send({
                "description": "Se ha realizado con éxito esta solicitud.",
                "content":{
                    "application/json":{
                        "schema":{
                            "type": "array",
                            "items": data
                        }
                    }
                }
            })
        })
        .catch(() => {
            res.status(404).json({
                "Error": "No se han encontrado resultados."
            })
        })
}


exports.findById = (req, res) => {
    const username = req.params.user
    if(req.username === username || req.admin){
        Users.findAll({
            include: {
                model: Orders,
                attributes:['payment', 'description', 'state']
            },
            where:{
                username: username
            },
            attributes:['username', 'nameAndSurname', 'email', 'phone', 'address']
        })
            .then(data => {
                res.status(200).json({
                    "description": "Find a user by ID",
                    "content":{
                        "application/json":{
                            "schema":{
                                "type": "array"
                            },
                            "profileData": data
                        }
                    }
                })
            })
            .catch(() => {
                res.status(404).send({
                    error: "No se han encontrado resultados."
                })
            })
    }else{
        res.status(403).send({
            mensaje: 'No tienes acceso a esta información'
        })
    }
}

exports.create = async (req, res) => {
    const { username, nameAndSurname, email, phone, address, password } = req.body

    // Sevenn is the owner of Delilah Resto
    let isAdmin = username === 'sevenn' ? true : false
    const user = {
        username: username,
        nameAndSurname: nameAndSurname,
        email: email,
        phone: phone,
        address: address,
        password: await encode(password),
        isAdmin: isAdmin      
    }

    Users.create(user)
        .then(() => {
            res.status(201).json({
                message: "Usuario creado con éxito."
            })
        })
        .catch(() => {
            res.status(400).send({
                error: "Falta información para completar esta solcitud."
            })
        })
}

exports.delete = (req, res) => {
    const id = req.params.id
    Users.update(req.body, {
        where:{
            id: id
        }
    })
        .then(num => {
            if(num == 1){
                res.status(200).send({
                    message: "Se ha realizado con éxito esta solicitud."
                })
            }else{
                res.status(404).send({
                    message: "No se ha encontrado el recurso que solicita."
                })
            }
        })
        .catch(() => {
            res.status(400).send({
                message: "Falta información para completar esta solicitud."
        })
    })
}

exports.login = async (req, res) => {
    const { username, password, email } = req.body
    let isRegistered;
    let passwordSaved;
    let isAdmin;

    await Users.findAll({
        where: {
            username: username
        },
        attributes: ['username', 'password', 'isAdmin']
    })
        .then(el => {
            if(el[0].username === username){
                isRegistered = true
                passwordSaved = el[0].password,
                isAdmin = el[0].isAdmin
            }
        })
        .catch(() => {
            res.status(404).send({
                message: "No se ha encontrado el recurso que solicita."
            })
        })
    if(isRegistered){
        bcrypt.compare(password, passwordSaved, function(err, areEqual) {
            if(err){
                return err
            }else if(areEqual){
                res.status(200).send({
                    token: getToken({
                        username: username,
                        email: email,
                        isAdmin: isAdmin
                    }),
                    message: 'Se ha realizado con éxito esta solicitud.'
                })
            }else{
                res.status(401).send({
                    message: "Usuario sin autorización para realizar esta acción."
                })
            }
        })
    }
}

exports.giveManagement = (req, res) => {
    Users.update(req.body, {
        where: {
            id: req.params.id
        }
    })
        .then(num => {
            if(num == 1){
                res.status(201).send({
                    message: "Se ha realizado con éxito esta solicitud."
                })
            }else{
                res.status(404).send({
                    message: "No se ha encontrado el recurso que solicita."
                })
            }
        })
        .catch(() => {
            res.status(500).send({
                message: "Ha ocurrido un error durante el proceso."
            })
        })
}

