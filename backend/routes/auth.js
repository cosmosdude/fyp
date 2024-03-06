// Authentication related routes
const express = require('express')
const controller = require('../controllers/login')
const router = express.Router();

// use form parser middleware
router.use(express.json())

router.post('/login', controller.login)

module.exports = router