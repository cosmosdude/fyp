const express = require('express')
const router = express.Router();
const asyncHandler = require('express-async-handler')
const controller = require('../controllers/payslip')
const mw = {
    json: express.json(),
    multipart: require('../middlewares/formidable-multipart'),
}

// Get payslips of all users for given month and year
router.get('/', [], asyncHandler(controller.getAll))

// Payslip detail
router.get('/payslip/:id', [], asyncHandler(controller.payslipDetail))

// Payslip detail
router.get('/payslip/:id/acknowledge', [], asyncHandler(controller.getAll))

// Get payslips of given user
router.get('/user/:userId', [], asyncHandler(controller.getAll))

// Generate for given all users for given month and year
router.get('/generate', [], asyncHandler(controller.getAll))

// Generate for given user for given month and year
router.get('/generate/user/:userId', [], asyncHandler(controller.generateForUser))





module.exports = router