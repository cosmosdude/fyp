const db = require('../mysql');
const {randomUUID: uuid} = require('crypto');
// const {format} = require('date-fns');

exports.getAll = async (req, res, next) => {
    res.send("getAll")
}