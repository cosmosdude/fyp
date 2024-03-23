const db = require('../mysql');
const {randomUUID: uuid} = require('crypto');
//const {format} = require('date-fns');

exports.getAllRequests = async (req, res) => {
    res.send("getAllRequests")
}

exports.getMyRequests = async (req, res) => {
    res.send("getMyRequests")
}

exports.requestOT = async (req, res) => {
    res.send("requestOT")
}

exports.respondOT = async (req, res) => {
    res.send("respondOT")
}