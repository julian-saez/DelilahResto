const router = require("express").Router();
const Foods = require('../controllers/foods');
const { verifyRol, verifyToken } = require("../middlewares");
const { getFoodWithOrders, getFoodsListOnly  } = require("../services");
const jwt = require('jsonwebtoken')
const { JWT_TOKEN } = require('../config')

router.get('/', verifyToken, (req, res) => {
    req.admin ? getFoodWithOrders(req, res) : getFoodsListOnly(req, res)
})

router.post('/', verifyToken, verifyRol, Foods.create)

router.get('/:id', Foods.findOne)

router.put('/:id', verifyToken, verifyRol, Foods.update)

router.delete('/:id', verifyToken, verifyRol, Foods.delete)

module.exports = router;
