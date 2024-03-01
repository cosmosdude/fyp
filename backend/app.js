const express = require('express')

const router = express.Router()

const app = express()
const port = 3000

function logAPI(req, res, next) {
    console.log('Route', req.originalUrl)
    next()
}

app.use(logAPI)

function testMWare(req, res, next) {
    console.log("Hello World")
    next()
}

app.get('/', testMWare, (req, res) => {
    res.send('Hello World!')
})

app.use(require('./middlewares/404')) // catch unhandled routes as 404
app.use(require('./middlewares/500')) // catch unhandled errors as 500

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})

console.log()



