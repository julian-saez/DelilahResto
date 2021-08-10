const { Foods, Orders } = require('../db/db')
const jwt = require('jsonwebtoken')
const { JWT_TOKEN } = require('../config')
const { codes } = require('../utils/responses')

exports.findAll = (req, res) => {
    jwt.verify(req.token, JWT_TOKEN, (err, auth) => {
        if(err){
            res.status(403).send({
                message: codes[0].Forbidden
            })
        }else{ 
            Foods.findAll({
                where: {
                    availability: 1
                },
                attributes: auth.isAdmin ? {
                    include: {
                        model: Orders
                    },
                } : {
                    exclude: {
                        model: Orders
                    }
                }
            })
                .then(data => {
                    if(auth.isAdmin){
                        res.status(200).send(data)
                    }else{
                        res.status(200).send(data)
                    }
                })
                .catch(() => {
                    res.status(404).send({
                        message: codes[0].NotFound
                    })
                }) 
        }
    })
}

exports.findOne = (req, res) => {
    const id = req.params.id
    Foods.findByPk(id)
        .then(data => {
            if(data !== null){
                res.status(200).send(data)
            }else{
                res.status(404).send({
                    message: codes[0].NotFound
                })
            }
        })
        .catch(() => {
            res.status(500).send({
                message: codes[0].InternalServerError
            })
        })
}
exports.delete = (req, res) => {
    const id = req.params.id

    Foods.destroy({
        where: { id: id }
    })
        .then(num => {
            if(num == 1){
                res.status(201).send({
                    message: codes[0].Created
                })
            }else{
                res.status(404).send({
                    message: codes[0].NotFound
                })
            }
        })
        .catch(() => {
            res.status(500).send({
                message: codes[0].InternalServerError
            })
        })
}

exports.create = (req, res) => {
    const { name, price, img } = req.body
    if(!name, !price, !img){
        res.status(400).send({
            message: codes[0].BadRequest
        })
    }

    const food = {
        name: name,
        price: price,
        img: img,
        availability: 1
    }

    Foods.create(food)
        .then(data => {
            res.status(201).send(data)
        })
        .catch(() => {
            res.status(500).send({
                message: codes[0].InternalServerError 
            })   
        })
}

exports.update = (req, res) => {
    const id = req.params.id

    Foods.update(req.body, {
        where: {
            id: id
        }
    })
        .then(num => {
            if(num == 1){
                res.status(201).send({
                    message: codes[0].Ok
                })
            }else{
                res.status(404).send({
                    message: codes[0].NotFound
                })
            }
        })
        .catch(() => {
            res.status(500).send({
                message: codes[0].InternalServerError
            })
        })
}

