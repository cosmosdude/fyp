// department routes
const express = require('express') 
const router = express.Router();

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
router.get('/', controller.getAll)
router.post('/holiday/', multipart, controller.create)
router.get('/holiday/:id', controller.get)
router.put('/holiday/:id', multipart, controller.update)
router.delete('/holiday/:id', controller.delete)

// router.get('/department/:id', controller.get)
// router.post('/department', controller.store)
// router.put('/department/:id', controller.update)
// router.delete('/department/:id', controller.delete)

module.exports = router