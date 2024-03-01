// Authentication related routes

const express = require('express');

const router = express.Router();

router.post('/login', (req, res) => {
    res.json({
        'accessToken': 'Test'
    })
})

router.post('/register', (req, res) => {
    res.sendStatus(201)
})

module.exports = router