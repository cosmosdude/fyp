/**
 * Inject `zod` object. 
 * Currently this object injects a function `sendError` on `res` object 
 * which send zod issues to client.
 * @param {*} req Express request
 * @param {*} res Express response
 * @param {*} next Express next chain
 */
module.exports = (req, res, next) => {
    res.zod = {
        sendError(error) {
            res.status(400).json(error.issues.map(i => {
                return `${i.path.toString()}: ${i.message}`
            }))
        }
    }
    next()
}