const router = require("express").Router();
const Users = require('../controllers/users');
const { verifyToken, verifyRol } = require("../middlewares");

// Route to get all users registered
router.get('/', verifyToken, verifyRol, Users.findAll)

// Router to sign up in Delilah Resto
router.post('/signup', Users.create)

// Route to remove a user
router.delete('/:id', verifyToken, verifyRol, Users.delete)

// Route to log in with your account 
router.post('/login', Users.login)

// Route to show the information of user's profile.
router.get('/:username', verifyToken, verifyRol, Users.getUsername)

// Only the current manager can do this
router.put('/admin', verifyToken, verifyRol, Users.giveManagement)

module.exports = router;