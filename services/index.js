const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { JWT_TOKEN } = require('../config')
const { Foods, Orders } = require('../db/db')

const encode = async password => {
    const salt = await bcrypt.genSalt(10)
    const hased = await bcrypt.hash(password, salt);
    return hased;
}

const getToken = data => {
    return jwt.sign(data, JWT_TOKEN, { expiresIn:'30m' })
}

const getFoodWithOrders = (req, res) => {
    Foods.findAll({
        include: {
            model: Orders
        }
    })
        .then(data => {
            res.send(data)
        })
        .catch(err => {
            res.status(404).json({
                "message": "No results found. There is no information stored in the database. ",
                "error": err
            })
        }) 
}

const getFoodsListOnly = (req, res) => {
    Foods.findAll({
        attributes: ['id', 'name', 'price']
    })
        .then(data => {
            res.send(data)
        })
        .catch(err => {
            res.status(404).json({
                "message": "No results found. There is no information stored in the database. ",
                "error": err
            })
        }) 
}


module.exports = {
    getFoodWithOrders,
    getFoodsListOnly,
    encode,
    getToken
}
