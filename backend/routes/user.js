// department routes
const express = require('express') 
const router = express.Router();
const asyncHandler = require('express-async-handler')

const controller = require('../controllers/user')

const { limitExactly } = require('../middlewares/role-limitation')

const { dirname } = require('path')

// requires authentication
router.use(require('../middlewares/authenticated'))

// form-data
// x-www-urlencoded
router.use(require('../middlewares/formidable-multipart'))
// application/json
router.use(express.json())

// Routes
router.get(
    '/', 
    limitExactly(['admin', 'hr']), 
    asyncHandler(controller.getAll)
)

router.post(
    '/user', 
    limitExactly(['admin', 'hr']), 
    asyncHandler(controller.store)
)

router.get(
    '/user/me', asyncHandler(controller.getMe)
)

router.get(
    '/user/:id', asyncHandler(controller.get)
)

router.put(
    '/user/:id', 
    limitExactly(['admin', 'hr']), 
    asyncHandler(controller.update)
)
router.delete(
    '/user/:id', 
    limitExactly(['admin', 'hr']), 
    asyncHandler(controller.delete)
)

router.use('/test', (req, res) => {
    // res.send(dirname(require.main.filename))
    res.send("")
})

module.exports = router