module.exports = (req, res, next) => {
    console.log(req.method, req.originalUrl)
    console.log(req.body)
    next()
}