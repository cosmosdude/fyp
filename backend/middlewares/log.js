module.exports = (req, res, next) => {
    console.log("Method:", req.method, "URL:", req.originalUrl)
    console.log(req.body)
    next()
}