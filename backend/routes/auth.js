// Authentication related routes
const express = require('express')
const controller = require('../controllers/login')
const asyncHandler = require('express-async-handler')
const router = express.Router();

// use form parser middleware
router.use(express.json())

router.post('/login', asyncHandler(controller.login))

module.exports = router