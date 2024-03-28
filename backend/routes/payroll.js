const express = require('express')
const router = express.Router();
const asyncHandler = require('express-async-handler')
const controller = require('../controllers/payroll')
const mw = {
    json: express.json(),
    multipart: require('../middlewares/formidable-multipart'),
}

// Get all payrolls
router.get('/', [], asyncHandler(controller.getAll))

// User's payroll
router.get('/user/:userId', [], asyncHandler(controller.getAll))
// Payroll Update
router.put('/user/:userId', [], asyncHandler(controller.getAll))

// Get user's payroll items
router.get('/user/:userId/item', [], asyncHandler(controller.getAll))
// Add user's payroll item
router.post('/user/:userId/item', [], asyncHandler(controller.getAll))
// Delete user's payroll item
router.delete('/user/:userId/item/:itemId', [], asyncHandler(controller.getAll))

module.exports = router