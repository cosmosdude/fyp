// department routes
const express = require('express') 
const router = express.Router();
const asyncHandler = require('express-async-handler')

const controller = require('../controllers/department')

// requires authentication
router.use(require('../middlewares/authenticated'))

// form-data
// x-www-urlencoded
router.use(require('../middlewares/formidable-multipart'))
// application/json
router.use(express.json())

// Routes
router.get('/', asyncHandler(controller.getAll))
router.get('/department/:id', asyncHandler(controller.get))
router.post('/department', asyncHandler(controller.store))
router.put('/department/:id', asyncHandler(controller.update))
router.delete('/department/:id', asyncHandler(controller.delete))

module.exports = router