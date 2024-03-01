module.exports = (req, res) => {
    console.log('404')
    res.status(404).send('Not Found')
}