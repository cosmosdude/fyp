require('dotenv').config()
const express = require('express')
const app = express()

// Configure logger middleware
app.use(require('./middlewares/log'))

// Configure statis file server middleware
app.use(express.static('public'))

// Configure Routers middlewares
app.use('/api/auth', require('./routes/auth'))
app.use('/api/departments', require('./routes/department'))

// Configure rudimentary middlewares
app.use(require('./middlewares/404')) // catch unhandled routes as 404
app.use(require('./middlewares/500')) // catch unhandled errors as 500

module.exports = app



