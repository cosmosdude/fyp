// department routes
const express = require('express') 
const router = express.Router();

const controller = require('../controllers/department')

// requires authentication
router.use(require('../middlewares/authenticated'))

// form-data
// x-www-urlencoded
router.use(require('../middlewares/formidable-multipart'))
// application/json
router.use(express.json())

// Routes
router.get('/', controller.getAll)
router.post('/department', controller.store)
router.put('/department/:id', controller.update)

module.exports = router