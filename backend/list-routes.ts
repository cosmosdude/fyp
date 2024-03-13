const expressListRoutes = require('express-list-routes')
const app = require('./app')

expressListRoutes(app, { prefix: '/' })