// department routes
const express = require('express') 
const router = express.Router();

const controller = require('../controllers/user')

const { limitExactly } = require('../middlewares/role-limitation')

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
    controller.getAll
)

router.post(
    '/user', 
    limitExactly(['admin', 'hr']), 
    controller.store
)

router.get(
    '/user/me', controller.getMe
)

router.get(
    '/user/:id', controller.get
)

router.put(
    '/user/:id', 
    limitExactly(['admin', 'hr']), 
    controller.update
)
router.delete(
    '/user/:id', 
    limitExactly(['admin', 'hr']), 
    controller.delete
)

module.exports = router