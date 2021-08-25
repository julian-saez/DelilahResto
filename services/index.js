const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { JWT_TOKEN } = require('../config')

const encode = async password => {
    const salt = await bcrypt.genSalt(10)
    const hased = await bcrypt.hash(password, salt);
    return hased;
}

const getToken = data => {
    return jwt.sign(data, JWT_TOKEN, { expiresIn:'30m' })
}

module.exports = {
    encode,
    getToken
}
