// Authentication related routes
const express = require('express')
const jwt = require('../jwt')
const md5 = require('md5')
const con = require('../mysql')

const controller = require('../controllers/login')
const router = express.Router();

// use form parser middleware
router.use(require('../middlewares/formidable-multipart'))

router.post('/login', controller.login)

module.exports = router