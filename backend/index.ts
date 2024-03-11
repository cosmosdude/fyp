const port = 3000

require('./app').listen(port, () => {
    console.log(`Server running on http://localhost:${port}`)
})