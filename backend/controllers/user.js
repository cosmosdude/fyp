const {format} = require('date-fns')
const con = require('../mysql')
const {randomUUID: uuid} = require('crypto')

exports.getAll = async (req, res) => {
    res.sendStatus(200)
}

exports.get = async (req, res) => {
    res.sendStatus(200)
}

exports.store = async (req, res) => {
    res.sendStatus(202)
}

exports.update = async (req, res) => {
    res.sendStatus(202)
}

exports.delete = async(req, res) => {
    res.sendStatus(202)
}