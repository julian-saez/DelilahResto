const { codes } = require('../utils/responses')
const conexion = require('../database/db')

exports.findAll = (req, res) => {
    conexion.query('SELECT * FROM orders JOIN users ON users.userId = user_id', (err, rows) => {
        if(err) res.send(codes[0].InternalServerError)
        let isNull = rows.length === 0 ? true : false
        if(isNull){
            res.status(404).send(codes[0].NotFound)
        }else{
            res.status(200).send(rows)
        }
    })
}

exports.getMyOrders = (req, res) => {
    const id = req.params.id
    if(req.match || req.admin){
        conexion.query('SELECT payment, description, state, food_id FROM orders WHERE user_id = ?', [id], (err, rows) => {
            if(err) res.send(err)
            let isNull = rows.length === 0 ? true : false
            if(isNull){
                res.status(404).send({
                    status: 404,
                    message: codes[0].NotFound,
                    details: "El usuario con el ID especificado no tiene ordenes previas o puede que no exista."
                })
            }else{
                res.send(rows)
            }
        })
    }else{
        res.status(401).send({
            status: 401,
            message: codes[0].Unauthorized
        })
    }
}

exports.findOne = (req, res) => {
    const id = req.params.id
    conexion.query('SELECT state, description, user_id, food_id FROM orders WHERE orderId = ?', [id], (err, result) => {
        if(err) res.status(500).send(codes[0].InternalServerError)
        let isNull = result.length === 0 ? true : false
        if(isNull){
            res.send("La orden con el ID especificado no corresponde a ninguno existente.")
        }else{
            res.status(200).send(result)
        }
    })
}

exports.postOrder = (req, res) => {
    const { payment, description, user_id, food_id } = req.body
    const order = {
        payment: payment,
        description: description,
        state: 1,
        food_id: food_id,
        user_id: user_id
    }

    if(payment, description, user_id, food_id){
        conexion.query('INSERT INTO orders(orderId, payment, description, state, food_id ,user_id) VALUES(NULL, ?, ?, ?, ?, ?)', [order.payment, order.description, order.state, order.food_id, order.user_id], (err, rows) => {
            if(err) res.send(err)
            if(rows.affectedRows === 0){
                res.status(500).send({
                    message: codes[0].InternalServerError
                })
            }else{
                res.status(201).send({
                    message: codes[0].Ok,
                    affectedRows: rows.affectedRows
                })
            }
        })
    }else{
        res.status(400).send({
            status: codes[0].BadRequest 
        })
    }
}

exports.updateStatus = (req, res) => {
    const { orderId, status } = req.body
    conexion.query('UPDATE orders SET state = ? WHERE orderId = ?', [status, orderId], (err, rows) => {
        if(err) res.status(500).send({
            message: codes[0].InternalServerError
        })
        if(rows.affectedRows === 0){
            res.status(404).send({
                message: "Esa orden no existe."
            })
        }else{
            res.status(200).send({
                message: codes[0].Created,
                affectedRows: rows.affectedRows
            })
        }
    })
}

exports.delete = (req, res) => {
    const id = req.params.id
    conexion.query(`DELETE FROM orders WHERE orderId = ${id}`, (err, rows) => {
        if(err) res.status(500).send({
            message: codes[0].InternalServerError,
            additionalInfo: "Puede que el valor del parametro id sea invalido."
        })
        if(rows.affectedRows === 0){
            res.status(404).send("La orden con ese ID no existe o ya fue eliminada.")
        }else{
            res.status(201).send({
                message: codes[0].Created,
                affectedRows: rows.affectedRows
            })
        }
    })
}