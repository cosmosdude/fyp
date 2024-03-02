module.exports = (req, res, next) => {
    console.log('URL:', req.originalUrl)
    next()
}