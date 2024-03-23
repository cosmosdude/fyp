const db = require('../mysql');
const {randomUUID: uuid} = require('crypto');
//const {format} = require('date-fns');

exports.getAllRequests = async (req, res) => {
    res.send("getAllRequests")
}