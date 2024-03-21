module.exports = (error, req, res, next) => {
    // console.log('\x1b[2J');
    console.log("Error")
    console.log("Error", error.stack)
    // res.status(500)
    if (process.env.NAME) {
        res.status(500).send(`
        DEVELOPMENT ONLY\n
        ${error.stack}
        `)
    }
    else res.send('Internal Server Error')
    // res.status(500).send("Internal Server Error")
}