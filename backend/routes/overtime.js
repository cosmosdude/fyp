const express = require('express')
const router = express.Router();
const asyncHandler = require('express-async-handler')
const controller = require('../controllers/overtime')
const mw = {
    json: express.json(),
    multipart: require('../middlewares/formidable-multipart'),
}

router.get('/requests', [], asyncHandler(controller.getAllRequests))
router.get('/requests/me', [], asyncHandler(controller.getMyRequests))
router.post('/requests/request', [], asyncHandler(controller.requestOT))
router.put('/requests/request/:id', [], asyncHandler(controller.respondOT))

module.exports = router