const db = require('../mysql');
const {randomUUID: uuid} = require('crypto');
// const {format} = require('date-fns');

exports.getAll = async (req, res, next) => {
    res.send("getAll")
}

exports.getAllAttendanceRequests = async (req, res, next) => {
    res.send("getAllAttendanceRequests")
}

exports.getMyAttendanceRequests = async (req, res, next) => {
    res.send("getMyAttendanceRequests")
}

exports.requestAttendance = async (req, res, next) => {
    res.send("requestAttendance")
}

exports.respondAttendanceRequest = async (req, res, next) => {
    res.send("respondAttendanceRequest")
}

