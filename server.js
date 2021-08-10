const express = require('express')
const cors = require('cors')
const helmet = require('helmet')
const app = express()

app.use(cors())
app.use(express.json({ limit: '100kb' }));
app.use(express.urlencoded({ extended: true }))
app.use(helmet())

require('./db/db')

const users = require('./routes/users')
const foods = require('./routes/foods')
const orders = require('./routes/orders')
const db_values = require('./routes/db')

app.use(express.json())

app.set('port', process.env.PORT || 3000)

app.listen(app.get('port'), () => {
    console.log('Listening at port', app.get('port'))
})

app.use('/v1/users', users)
app.use('/v1/foods', foods)
app.use('/v1/orders', orders)
app.use('/v1/db', db_values)

app.use((err, req, res, next) => {
	if (!err) return next();
	console.log("An error has occurred", err);
	res.status(500).json(err.message);
	throw err;
});