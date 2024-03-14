require('dotenv').config()

const u = require('./utils/filteredObject.ts')

const express = require('express')
const cors = require('cors')

const app = express()

// MW: Logging
app.use(require('./middlewares/log'))
// MW: Cross-Origin Resource Sharing
app.use(cors())

// MW: Static file server
app.use(express.static('public'))

// Configure Routers middlewares
app.use('/api/auth', require('./routes/auth'))
app.use('/api/departments', require('./routes/department'))
app.use('/api/designations', require('./routes/designation'))
app.use('/api/users', require('./routes/user'))
app.use('/api/statistic', require('./routes/statistics'))


// # Tests
const upload = require('./services/fileHandling.js')

app.use('/test', require('./middlewares/formidable-multipart'), async (req, res) => {
    console.log("Fields", req.fields)
    console.log("Files", req.files)
    
    let files = req.files['f']

    let uploadedFiles = await Promise.all(
        files.map(async (f) => {
            let uploaded = await upload(f)

            return uploaded
        })
    )
    res.status(200).json({ 
        fields: req.fields, files: req.files,
        uploadedFiles
    })
})

// MW: 404
app.use(require('./middlewares/404')) // catch unhandled routes as 404
// MW: 500
app.use(require('./middlewares/500')) // catch unhandled errors as 500

module.exports = app



