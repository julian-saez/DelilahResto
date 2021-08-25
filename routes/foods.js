const router = require("express").Router();
const Foods = require('../controllers/foods');
const { verifyRol, verifyToken } = require("../middlewares");

// Endpoint to get all the food
router.get('/', verifyToken, Foods.findAll)

// Endpoint to add a food
router.post('/', verifyToken, verifyRol, Foods.create)

// Endpoint to get a food by ID
router.get('/:id', verifyToken, Foods.findOne)

// Endpoint to update the price by ID
router.put('/', verifyToken, verifyRol, Foods.update)

// Endpoint to delete a food by ID
router.delete('/:id', verifyToken, verifyRol, Foods.delete)

module.exports = router;
