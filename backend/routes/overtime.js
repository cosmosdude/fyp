const express = require('express')
const router = express.Router();
const asyncHandler = require('express-async-handler')
const controller = require('../controllers/overtime')
const mw = {
    json: express.json(),
    multipart: require('../middlewares/formidable-multipart'),
}

router.get('/', [], asyncHandler(controller.getAllRequests))

module.exports = router