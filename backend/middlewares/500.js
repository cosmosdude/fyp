module.exports = (error, req, res, next) => {
    console.log(error.stack)
    res.status(500).send('Internal Server Error')
}