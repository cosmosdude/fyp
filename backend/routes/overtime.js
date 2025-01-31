const express = require('express')
const router = express.Router();
const asyncHandler = require('express-async-handler')
const controller = require('../controllers/overtime')
const mw = {
    json: express.json(),
    multipart: require('../middlewares/formidable-multipart'),
}

router.use(require('../middlewares/authenticated'))
router.use(mw.multipart)


router.get('/requests', [], asyncHandler(controller.getAllRequests))
router.get('/requests/me', [], asyncHandler(controller.getMyRequests))
router.get('/requests/request/:id', [], asyncHandler(controller.requestDetail))
router.post('/requests/request', [], asyncHandler(controller.requestOT))
router.put('/requests/request/:id', [], asyncHandler(controller.respondOT))
router.get('/monthly', [], asyncHandler(controller.getMonthlyOvertime))
router.get('/:id', [], asyncHandler(controller.getTotalOvertime))

module.exports = router