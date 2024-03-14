const express = require('express') 
const router = express.Router();

const controller = require('../controllers/statistic')

// requires authentication
router.use(require('../middlewares/authenticated'))

// form-data
// x-www-urlencoded
// router.use(require('../middlewares/formidable-multipart'))
// application/json
// router.use(express.json())

// Routes
router.get('/departments', controller.departments)


module.exports = router