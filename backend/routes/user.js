// department routes
const express = require('express') 
const router = express.Router();

const controller = require('../controllers/user')

// requires authentication
router.use(require('../middlewares/authenticated'))

// form-data
// x-www-urlencoded
router.use(require('../middlewares/formidable-multipart'))
// application/json
router.use(express.json())

// Routes
router.get('/', controller.getAll)
router.post('/user', controller.store)
router.get('/user/:id', controller.get)
router.put('/user/:id', controller.update)
router.delete('/user/:id', controller.delete)

module.exports = router