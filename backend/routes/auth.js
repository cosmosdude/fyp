// Authentication related routes

const express = require('express')
const jwt = require('../jwt')
const md5 = require('md5')
const con = require('../mysql')

const router = express.Router();

// use form parser middleware
router.use(require('../middlewares/formidable-multipart'))

router.post('/login', async (req, res) => {
    console.log('/login')
    console.log(req.flatFields)
    let {username, password} = req.flatFields
 
    function sendError(error) {
        res.status(400).json({error})
    }

    if (!username) return sendError('Username is missing')
    if (!password) return sendError('Password is missing')
 
    try {
        let [results] = await con.promise().query('select * from users where username = ?', [username])
        console.log("Query Results", results)

        if (results.length != 1) return sendError('Invalid credential')

        let user = results[0]
        if (md5(password) !== user['password']) return sendError('Invalid credential')

        let theUser = {
            id: user.id,
            workEmail: user.work_email,
            roleId: user.role_id
        }
        let token = jwt.sign(theUser)
        res.json({accessToken: token})
    } catch (error) { 
        throw error
    }
})

module.exports = router