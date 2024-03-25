const express = require('express')
const router = express.Router();
const asyncHandler = require('express-async-handler')
const controller = require('../controllers/attendance')
const mw = {
    json: express.json(),
    multipart: require('../middlewares/formidable-multipart'),
}

router.use(require('../middlewares/authenticated'))
router.use(mw.multipart)

router.get('/', [], asyncHandler(controller.getAll))
router.get('/me', [], asyncHandler(controller.getAll))

router.get('/requests', [], asyncHandler(controller.getAllAttendanceRequests))
router.get('/requests/me', [], asyncHandler(controller.getMyAttendanceRequests))
router.post('/requests/request', [], asyncHandler(controller.requestAttendance))
router.get('/requests/request/:id', [], asyncHandler(controller.attendanceRequestDetail))
router.put('/requests/request/:id', [], asyncHandler(controller.respondAttendanceRequest))

module.exports = router