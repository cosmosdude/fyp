// Authentication related routes
const express = require('express')
const controller = require('../controllers/notifications')
const asyncHandler = require('express-async-handler')
const router = express.Router();

// use form parser middleware
router.use(express.json())

// requires authentication
router.use(require('../middlewares/authenticated'))

router.get('/', asyncHandler(controller.getAll))
router.get('/:id/read', asyncHandler(controller.read))

module.exports = router