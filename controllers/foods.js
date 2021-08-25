const conexion = require('../database/db')
const { codes } = require('../utils/responses')

exports.findAll = (req, res) => {
    conexion.query('SELECT * FROM foods', (err, rows) => {
        if(err) res.status(500).send({
            message: codes[0].InternalServerError
        })
        let isNull = rows.length === 0 ? false : true
        if(isNull){
            res.status(200).send(rows)
        }else{
            res.status(404).send({
                message: codes[0].NotFound
            })
        }
    })
}

exports.findOne = (req, res) => {
    const id = req.params.id
    conexion.query('SELECT * FROM foods WHERE foodId = ?', [id], (err, rows) => {
        if(err) res.status(500).send({
            message: codes[0].InternalServerError
        })
        let isNull = rows.length === 0 ? false : true
        if(isNull){
            res.status(200).send(rows)
        }else{
            res.status(404).send("No hay un plato con ese ID.")
        }
    })
}

exports.delete = (req, res) => {
    const id = req.params.id
    conexion.query('DELETE FROM foods WHERE foodId = ?', [id], (err, rows) => {
        if(err) res.status(500).send({
            message: codes[0].InternalServerError
        })
        if(rows.affectedRows !== 0){
            res.status(201).send({
                status: 201,
                affectedRows: rows.affectedRows
            })
        }else{
            res.status(404).send({
                message: codes[0].NotFound
            })
        }
    })
}

exports.create = (req, res) => {
    const { food_title, price } = req.body
    if(!food_title, !price){
        res.status(400).send({
            message: codes[0].BadRequest
        })
    }
    const food = {
        food_title: food_title,
        price: price
    }
    conexion.query('INSERT INTO foods(foodId, food_title, price) VALUES(NULL, ?, ?)', [food.food_title, food.price], (err, rows) => {
        if(err) res.status(500).send(codes[0].InternalServerError)
        if(rows.affectedRows !== 0){
            res.status(201).send({
                message: codes[0].Created,
                status: 201,
                affectedRows: rows.affectedRows
            })
        }else{
            res.send(500).send(codes[0].InternalServerError)
        }
    })
}

exports.update = (req, res) => {
    const { foodId, price } = req.body
    conexion.query('UPDATE foods SET price = ? WHERE foodId = ?', [price, foodId], (err, rows) => {
        if(err) res.status(500).send({
            message: codes[0].InternalServerError
        })
        if(rows.affectedRows !== 0){
            res.status(201).send({
                message: codes[0].Created,
                status: 201,
                affectedRows: rows.affectedRows
            })
        }else{
            res.status(404).send({
                message: codes[0].NotFound,
                status: 404
            })
        }
    })
}

