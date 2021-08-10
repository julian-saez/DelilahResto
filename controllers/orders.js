const { Orders, Users } = require('../db/db')
const { Op } = require('sequelize')
const { codes } = require('../utils/responses')

exports.findAll = (req, res) => {
    Orders.findAll({
        include: {
            model: Users,
            attributes:['username', 'nameAndSurname', 'email', 'phone', 'address']
        },
        attributes: ['payment', 'description' ,'state']
    })
        .then(data => {
            res.status(200).send(data)
        })
        .catch(() => {
            res.status(500).send({
                message: codes[0].InternalServerError
            })
        })
}

exports.findAllStateId = (req, res) => {
    const state = req.params.state
    const condition = state ? { state: { [Op.like]: `%${state}%` } } : null

    Orders.findAll({
        where: condition
    })
        .then(data => {
            res.status(200).send(data)
        })
        .catch(() => {
            res.status(400).send({
                mensaje: codes[0].BadRequest
            })
        })
}

exports.findOne = (req, res) => {
    const id = req.params.id
    Orders.findByPk(id)
        .then(data => {
            res.status(200).send(data)
        })
        .catch(err => {
            res.status(500).send({
                mensaje: codes[0].InternalServerError
            })
        })
}

exports.postOrder = (req, res) => {
    const { payment, description, userId, foodId } = req.body

    if(!payment, !description, !userId) return res.send({message: '¡Falta información!'})

    const order = {
        payment: payment,
        description: description,
        state: 1,
        userId: userId,
        foodId: foodId
    }

    Orders.create(order)
        .then(() => {
            res.status(201).send({
                message: codes[0].Ok
            })
        })
        .catch(() => {
            res.status(400).send({
                message: codes[0].BadRequest
            })
        })
}

exports.modifyStatus = (req, res) => {
    const id = req.params.id
    Orders.update(req.body, {
        where:{
            id: id
        }
    })
        .then(num => {
            if(num == 1){
                res.status(201).send({
                    message: 'Status has been successfully updated.'
                })
            }else{
                res.sendStatus(202)
            }
        })
        .catch(() => {
            res.status(404).send({
                mensaje: codes[0].NotFound
            })
        })
}