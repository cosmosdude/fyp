const express = require('express')
const router = express.Router();
const asyncHandler = require('express-async-handler')
const controller = require('../controllers/shift')
const mw = {
    json: express.json(),
    multipart: require('../middlewares/formidable-multipart'),
}

router.use(require('../middlewares/authenticated'))
router.use(mw.multipart)

router.get('/', [], asyncHandler(controller.getAll))
router.put('/shift', [], asyncHandler(controller.updateShift))
router.get('/:id', [], asyncHandler(controller.getUserShifts))


module.exports = router