const {format} = require('date-fns')
const con = require('../mysql')
const {randomUUID: uuid} = require('crypto')

exports.getAll = async (req, res) => {
    let [results] = await con.promise().query('select * from departments')
    res.json(results)
}

exports.get = async (req, res) => {
    let {id} = req.params
    let [results] = await con.promise().query('select * from departments where id=?', [id])
    if (results.length !== 1) return res.status(400).send('No such department')
    res.json(results[0])
}

exports.store = async (req, res) => {
    let {name} = req.body
    console.log(name)
    if (!name) return res.sendStatus(400)

    let [results, fields] = await con.promise().query(
        'insert into departments(name) values(?)', 
        [name]
    ) 
    console.log("Results", results)
    console.log("Fields", fields)
    res.sendStatus(202)
}

exports.update = async (req, res) => {
    let {name} = req.body
    if (!name) return res.sendStatus(400)

    let id = req.params.id
    let [results] = await con.promise().query('select * from departments where id=?', [id])
    if (results.length !== 1) return res.status(400).send('No such department')

    await con.promise().query(
        'update departments set name=? where id=?',
        [name, id]
    )

    res.sendStatus(202)
}

exports.delete = async(req, res) => {
    let id = req.params.id
    let [results] = await con.promise().query('select * from departments where id=?', [id])
    if (results.length !== 1) return res.status(400).send('No such department')

    await con.promise().query(
        'update departments set deleted_at=? where id=?',
        [format(new Date(), 'yyyy-MM-dd'), id]
    )
    res.sendStatus(204)
}