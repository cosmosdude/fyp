// department routes
const express = require('express') 
const router = express.Router();
const asyncHandler = require('express-async-handler')

let multipart = require('../middlewares/formidable-multipart')
let json = express.json()
let urlencoded = express.urlencoded({extended: true})

const controller = require('../controllers/holiday')

// requires authentication
router.use(require('../middlewares/authenticated'))

// form-data
// x-www-urlencoded

// application/json

// Routes
router.get('/', asyncHandler(controller.getAll))
router.post('/holiday/', multipart, asyncHandler(controller.create))
router.get('/holiday/:id', asyncHandler(controller.get))
router.put('/holiday/:id', multipart, asyncHandler(controller.update))
router.delete('/holiday/:id', asyncHandler(controller.delete))

// router.get('/department/:id', controller.get)
// router.post('/department', controller.store)
// router.put('/department/:id', controller.update)
// router.delete('/department/:id', controller.delete)

module.exports = router