const { DataTypes } = require('sequelize')

module.exports = sequelize => {
    return sequelize.define('orders', {
        id:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        payment:{
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        description:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        state:{
            type: DataTypes.ENUM, 
            values: ['new', 'confirmed', 'preparing', 'sent', 'cancelled', 'delivered']
        }
    })
}