const db = require('../mysql')

exports.limitExactly = (allowed) => {
    if (!allowed) allowed = []
    console.log(allowed)

    if (allowed.length == 0) 
    allowed = ['admin', 'hr', 'manager', 'employee']
    return async (req, res, next) => {

        // query all roles
        let [roles] = await db.promise().query(
            'select * from roles where name in (?) or id in (?)', [allowed, allowed]
        )
        // extract user data from authentication
        let { data } = req.authentication

        let isValidRole = roles.map(x => x.id).includes(data.role_id)

        console.log('role contains:', isValidRole)

        if (!isValidRole)
        return res.status(401).send("You don't have permission.")
    
        next()
    }
}