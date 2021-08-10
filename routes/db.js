const router = require('express').Router()
const { Users, Foods, Orders } = require("../db/db")

router.post('/', async (req, res) => {
    const products = require('../utils/foods')
    const users = require('../utils/users')
    const orders = require('../utils/orders')

    products.forEach(el => {
        Foods.create(el)
            .then(() => {
                res.send(el)
                switch (el){
                    case true:
                        break;
                    case false:
                        res.sendStatus(202)
                }
            })
            .catch(err => {
                console.log(err)
            })
    })

    users.forEach(el => {
        Users.create(el)
            .then(() => {
                switch (el){
                    case true:
                        break;
                    case false:
                        res.sendStatus(202)
                }
            })
            .catch(() => {
                res.sendStatus(500)
            })
    })

    orders.forEach(el => {
        Orders.create(el)
            .then(() => {
                switch (el){
                    case true:
                        break;
                    case false:
                        res.sendStatus(202)
                }
            })
            .catch(() => {
                res.sendStatus(500)
            })
    })

    res.status(200).send({
        mensaje: "Haz hackeado éxitosamente mi app. Puedes continuar..."
    })
})

module.exports = router