const Sequelize = require('sequelize')
const mysql = require('mysql')
const sequelize = new Sequelize('mysql://root:Nw21j6739gx@localhost/delilahresto')

// Model 
const foodsModel = require('../model/foodModel')
const Foods = foodsModel(sequelize, Sequelize)

const usersModel = require('../model/usersModel')
const Users = usersModel(sequelize, Sequelize)

const ordersModel = require('../model/ordersModel')
const Orders = ordersModel(sequelize, Sequelize)

Users.hasOne(Orders)
Orders.belongsTo(Users)

Foods.hasOne(Orders)
Orders.belongsTo(Foods)


sequelize.sync( { force: false } )
	.then(() => {
		console.log('Tables created!')
	})

module.exports = {
    Foods,
    Users,
	Orders
}