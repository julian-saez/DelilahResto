const { DataTypes } = require('sequelize')

module.exports = sequelize => {
    return sequelize.define('foods', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name:{
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        price:{
            type: DataTypes.INTEGER,
            allowNull: false
        },
        availability:{
            type: DataTypes.INTEGER
        }
    })
}