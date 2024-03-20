// department routes
const express = require('express') 
const router = express.Router();

const controller = require('../controllers/holiday')

// requires authentication
router.use(require('../middlewares/authenticated'))

// form-data
// x-www-urlencoded
// router.use(require('../middlewares/formidable-multipart'))

// application/json
router.use(express.json())

router.use(express.urlencoded({extended: true}))

// Routes
router.get('/', controller.getAll)
router.get('/holiday/:id', controller.get)
router.post('/holiday/', controller.create)
// router.get('/department/:id', controller.get)
// router.post('/department', controller.store)
// router.put('/department/:id', controller.update)
// router.delete('/department/:id', controller.delete)

module.exports = router