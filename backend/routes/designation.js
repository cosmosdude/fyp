// department routes
const express = require('express') 
const router = express.Router();
const asyncHandler = require('express-async-handler')

const controller = require('../controllers/designation')

// requires authentication
router.use(require('../middlewares/authenticated'))

// form-data
// x-www-urlencoded
router.use(require('../middlewares/formidable-multipart'))
// application/json
router.use(express.json())
router.use(express.urlencoded({extended: true}))

// Routes
router.get('/', asyncHandler(controller.getAll))
router.post('/designation', asyncHandler(controller.store))
router.get('/designation/:id', asyncHandler(controller.get))
router.put('/designation/:id', asyncHandler(controller.update))
router.delete('/designation/:id', asyncHandler(controller.delete))

module.exports = router