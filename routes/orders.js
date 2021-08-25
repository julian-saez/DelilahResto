const router = require('express').Router()
const Orders = require('../controllers/orders')
const { verifyToken, verifyRol, verifyId } = require('../middlewares')

// Endpoint to get all the orders
router.get('/', verifyToken, verifyRol, Orders.findAll)

// Endpoint to find an specific order 
router.get('/:id', verifyToken, verifyRol, Orders.findOne)

// Endpoint to get the orders by userID
router.get('/myorders/:id', verifyToken, verifyId, Orders.getMyOrders)

// Endpoint to create an order
router.post('/', verifyToken, verifyRol, Orders.postOrder)
 
// Endpoint to modify the status of an order
router.put('/status', verifyToken, verifyRol, Orders.updateStatus)

// Endpoint to delete a order by id
router.delete('/:id', verifyToken, verifyRol, Orders.delete)

module.exports = router