// department routes
const express = require('express') 
const router = express.Router();

const controller = require('../controllers/designation')

// requires authentication
router.use(require('../middlewares/authenticated'))

// form-data
// x-www-urlencoded
router.use(require('../middlewares/formidable-multipart'))
// application/json
router.use(express.json())

// Routes
router.get('/', controller.getAll)
router.post('/designation', controller.store)
router.get('/designation/:id', controller.get)
router.put('/designation/:id', controller.update)
router.delete('/designation/:id', controller.delete)

module.exports = router