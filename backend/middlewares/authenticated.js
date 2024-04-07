const jwt = require('../jwt')

module.exports = async function checkAuth(req, res, next) {
    // if header does not exists, it's unauthenticated
    if (!headerExists(req)) return res.sendStatus(401)
    
    // get token without bearer from the header
    let token = getToken(req)

    // if there is no token, it's unauthenticated
    if (!token) return res.sendStatus(401)

    // get verified value
    let value = await verifiedValueOrNull(token)
    // if cannot be verified, unauthenticated
    if (!value) return res.sendStatus(401)

    console.log(value)
    // set authentication value

    req.authentication = {
        accessToken: token,
        data: value
    }
    req.authToken = token
    req.authUser = value

    next()
}

function headerExists(req) {
    return req.headers['authorization'] && true
}

function getToken(req) {
    let auth = req.headers['authorization']
    let parts = auth.split(' ')
    return (parts.length >= 2) ? parts[1] : null
}

function getHeader(req) {
    return req.headers['authorization']
}

async function verifiedValueOrNull(token) {
    try {
        return await jwt.verify(token)
    } catch { return null }
}

