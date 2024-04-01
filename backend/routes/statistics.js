const express = require('express') 
const router = express.Router();
const asyncHandler = require('express-async-handler')

const controller = require('../controllers/statistic')

// requires authentication
router.use(require('../middlewares/authenticated'))

// form-data
// x-www-urlencoded
// router.use(require('../middlewares/formidable-multipart'))
// application/json
// router.use(express.json())

// Routes
router.get('/departments', asyncHandler(controller.departments))
router.get('/designations', asyncHandler(controller.designations))
router.get('/leave-trends', asyncHandler(controller.leaveTrends))
router.get('/absent-rate', asyncHandler(controller.absentRate))


module.exports = router