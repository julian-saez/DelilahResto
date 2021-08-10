const router = require('express').Router()
const Orders = require('../controllers/orders')
const { verifyToken, verifyRol } = require('../middlewares')

// Endpoint to get all the orders
router.get('/', verifyToken, verifyRol, Orders.findAll)

// Endpoint to get orders with an specific status
router.get('/:state', verifyToken, verifyRol, Orders.findAllStateId)

// Endpoint to find an specific order 
router.get('/:id', verifyToken, verifyRol, Orders.findOne)

// Endpoint to create an order
router.post('/', verifyToken, Orders.postOrder)

// Endpoint to modify the status of an order
router.put('/:id', verifyToken, verifyRol, Orders.modifyStatus)

module.exports = router