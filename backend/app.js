require('dotenv').config()

const u = require('./utils/filteredObject.ts')

const express = require('express')
const cors = require('cors')

const app = express()

// MW: Logging
app.use(require('./middlewares/log'))
app.use(require('./middlewares/zod.js'))

// MW: Cross-Origin Resource Sharing
app.use(cors())

// MW: Static file server
app.use(express.static('public'))

// Configure Routers middlewares
app.use('/api/auth', require('./routes/auth'))

app.use('/api/departments', require('./routes/department'))

app.use('/api/designations', require('./routes/designation'))

app.use('/api/users', require('./routes/user'))

app.use('/api/holidays', require('./routes/holidays'))

app.use('/api/leaves', require('./routes/leaves'))

app.use('/api/attendances', require('./routes/attendance'))
app.use('/api/shifts', require('./routes/shift'))

app.use('/api/overtimes', require('./routes/overtime'))

app.use('/api/payrolls', require('./routes/payroll'))
app.use('/api/payslips', require('./routes/payslip'))

app.use('/api/notifications', require('./routes/notifications'))

app.use('/api/statistic', require('./routes/statistics'))

app.use(
    '/test',
    (req, res, next) => { 
        // auth fail
        next()
    },
    (req, res) => { 
        throw "Testing 1 2 3"
    }
)

// # Tests
const upload = require('./services/fileHandling.js')

// app.use('/test', require('./middlewares/formidable-multipart'), async (req, res) => {
//     console.log("Fields", req.fields)
//     console.log("Files", req.files)
    
//     let files = req.files['f']

//     let uploadedFiles = await Promise.all(
//         files.map(async (f) => {
//             let uploaded = await upload(f)

//             return uploaded
//         })
//     )
//     res.status(200).json({ 
//         fields: req.fields, files: req.files,
//         uploadedFiles
//     })
// })

// [no-route], ['/test']

// MW: 404
app.use(require('./middlewares/404')) // catch unhandled routes as 404
// MW: 500
app.use(require('./middlewares/500.js')) // catch unhandled errors as 500

module.exports = app



