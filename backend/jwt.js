const jwt = require('jsonwebtoken')
const config = require('./configs/jwt.config')

exports.sign = (str) => {
    return jwt.sign(str, config.secret)
}

exports.verify = (token) => {
    return jwt.verify(token, config.secret)
}