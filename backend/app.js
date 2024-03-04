require('dotenv').config()

const {uuidv4: uuid} = require('uuid')

const express = require('express')
const app = express()

// Configure logger middleware
app.use(require('./middlewares/log'))

// Configure statis file server middleware
app.use(express.static('public'))

// Configure Routers middlewares
app.use('/api/auth', require('./routes/auth'))
app.use('/api/departments', require('./routes/department'))
app.use('/api/designations', require('./routes/designation'))
app.use('/api/users', require('./routes/user'))


const fs = require('fs')
const { dirname } = require('path')

const upload = require('./services/moveToUploads')

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

// Configure rudimentary middlewares
app.use(require('./middlewares/404')) // catch unhandled routes as 404
app.use(require('./middlewares/500')) // catch unhandled errors as 500

module.exports = app



