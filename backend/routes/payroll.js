const express = require('express')
const router = express.Router();
const asyncHandler = require('express-async-handler')
const controller = require('../controllers/payroll')
const mw = {
    json: express.json(),
    multipart: require('../middlewares/formidable-multipart'),
}

router.use(require('../middlewares/authenticated'))
router.use(mw.multipart)

// Get all payrolls
router.get('/', [], asyncHandler(controller.getAll))

// User's payroll
router.get('/user/:userId', [], asyncHandler(controller.get))
// Payroll Update
router.put('/user/:userId', [], asyncHandler(controller.update))

// Get user's payroll items
router.get('/user/:userId/items', [], asyncHandler(controller.getUserPayrollItems))
// Add user's payroll item
router.post('/user/:userId/items', [], asyncHandler(controller.addUserPayrollItem))
// Delete user's payroll item
router.delete('/user/:userId/items/:itemId', [], asyncHandler(controller.deleteUserPayrollItem))

module.exports = router