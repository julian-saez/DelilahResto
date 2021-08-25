const mysql = require('mysql2')
const config = require('../config')

/* 
	Database conexion with the server. 
	If you install this project, you must to create a config.js file and define the next data.
*/

const conection = mysql.createConnection({
	host: config.host,
	user: config.user,
	password: config.password,
	database: config.database,
	insecureAuth : true
})

conection.connect(err => {
	if(err) throw err
	console.log("Servidor conectado con la base de datos.")
})

module.exports = conection