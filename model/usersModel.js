const { DataTypes } = require('sequelize')

module.exports = sequelize => {
    return sequelize.define('users', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        username:{
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        nameAndSurname:{
            validate: {
                is: ['[a-z]','i'],
            },
            type: DataTypes.STRING,
            allowNull: false
        },
        email:{
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate:{
                isEmail: true
            }
        },
        phone: {
            type: DataTypes.BIGINT,
            allowNull: false
        },
        address:{
            type: DataTypes.STRING,
            allowNull: false
        },
        password:{
            type: DataTypes.JSON
        },
        isAdmin:{
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        isDisable:{
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true
        }
    })
}