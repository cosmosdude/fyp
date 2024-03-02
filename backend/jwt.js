const jwt = require('jsonwebtoken')

exports.sign = (str) => {
    return jwt.sign(str, process.env.JWT_SECRET)
}

exports.verify = (token) => {
    return jwt.verify(token, process.env.JWT_SECRET)
}