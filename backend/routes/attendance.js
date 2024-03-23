const express = require('express')
const router = express.Router();
const asyncHandler = require('express-async-handler')
const controller = require('../controllers/attendance')
const mw = {
    json: express.json(),
    multipart: require('../middlewares/formidable-multipart'),
}

router.get('/', [], asyncHandler(controller.getAll))

module.exports = router