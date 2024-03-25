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
router.get('/', limitExactly(['admin', 'hr']), asyncHandler(controller.getAll))
router.get('/hrs', asyncHandler(controller.getAllHRs))
router.get('/managers', asyncHandler(controller.getAllManagers))
router.get('/team', asyncHandler(controller.getTeamMembers))

router.post('/user', limitExactly(['admin', 'hr']), asyncHandler(controller.store))
router.get('/user/me', asyncHandler(controller.getMe))
router.get('/user/managers', asyncHandler(controller.getManagers))
router.get('/user/:id', asyncHandler(controller.get))
router.put('/user/:id', limitExactly(['admin', 'hr']), asyncHandler(controller.update))
router.delete('/user/:id', limitExactly(['admin', 'hr']), asyncHandler(controller.delete))


router.use('/test', asyncHandler(async (req, res) => {
    let day = new Date()
    res.json(day)
}))


module.exports = router