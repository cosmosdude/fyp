// department routes
const express = require('express') 
const asyncHandler = require('express-async-handler')
const router = express.Router();


let multipart = require('../middlewares/formidable-multipart')
let json = express.json()
let urlencoded = express.urlencoded({extended: true})

const controller = require('../controllers/leave')

// requires authentication
router.use(require('../middlewares/authenticated'))

// form-data
// x-www-urlencoded

// application/json

// Routes
router.get('/', asyncHandler(controller.getAll))
router.post('/leave/', multipart, asyncHandler(controller.create))
router.get('/leave/:id', asyncHandler(controller.get))
router.put('/leave/:id', multipart, asyncHandler(controller.update))
router.delete('/leave/:id', asyncHandler(controller.delete))

// User actions
router.get('/balance', asyncHandler(controller.user.getBalances))

router.get('/requests', asyncHandler(controller.user.getAllLeaveRequests))
router.post('/requests', multipart, asyncHandler(controller.user.request))

router.get('/requests/me', asyncHandler(controller.user.getMyLeaveRequests))

router.get('/requests/request/:id', asyncHandler(controller.user.requestDetail))
router.put('/requests/request/:id/response', multipart, asyncHandler(controller.user.response))

module.exports = router