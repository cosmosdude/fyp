const jwt = require('../jwt')
const md5 = require('md5')
const con = require('../mysql')

exports.login = async function login(req, res) {
    let {username, password} = req.flatFields
 
    function sendError(error) {
        res.status(400).json({error})
    }

    if (!username) return sendError('Username is missing')
    if (!password) return sendError('Password is missing')
 
    try {
        let [results] = await con.promise().query('select * from users where username = ?', [username])
        // there must be at least one result
        if (results.length != 1) return sendError('Invalid credential')
        // take the first result as the sole user
        let user = results[0]
        //
        if (md5(password) !== user['password']) return sendError('Invalid credential')

        let theUser = {
            id: user.id,
            workEmail: user.work_email,
            roleId: user.role_id
        }
        let token = jwt.sign(theUser, { algorithm: 'RS512' })
        res.json({accessToken: token})
    } catch (error) { 
        throw error
    }
}