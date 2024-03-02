const con = require('../mysql')

exports.getAll = async (req, res) => {
    let [results] = await con.promise().query('select * from departments')
    console.log(results)
    console.log(req.authentication)
    res.json(results)
}

exports.store = async (req, res) => {
    res.json(res.body)
    // res.send('Create Departments')
}

exports.update = async (req, res) => {
    res.send('Update Departments')
}