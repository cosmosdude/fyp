const {format} = require('date-fns')
const con = require('../mysql')
const {randomUUID: uuid} = require('crypto')

exports.getAll = async (req, res) => {
    console.log(req.query)
    let {departmentId} = req.query

    let [results] = await con.promise().query(
        `\
select A.id, \
A.name, \
B.id as department_id, \
B.name as department_name, \
A.deleted_at \
from designations as A \
inner join departments as B \
on A.department_id=B.id \
${departmentId ? 'where B.id=?' : ''}\ 
group by A.name
        `, [departmentId])
    res.json(results)
}

exports.get = async (req, res) => {

    let {id} = req.params
    let [results] = await con.promise().query(
        '\
select A.id, \
A.name, \
B.id as department_id, \
B.name as department_name, \
A.deleted_at \
from designations as A \
inner join departments as B \
on A.department_id=B.id \
where A.id=?\
', 
        [id]
    )
    if (results.length !== 1) return res.status(400).send('No such designation')
    res.json(results[0])
}

exports.store = async (req, res) => {
    let {name, departmentId} = req.body

    if (!name || !departmentId) 
    return res.sendStatus(400)

    if (!(await hasDepartment(departmentId))) 
    return res.status(400).send('No such department')

    // create new designation
    let [result] = await con.promise().query(
        'insert into designations(name, department_id) values(?, ?)', 
        [name, departmentId]
    )

    let [inserted] = await con.promise().query(
        'select * from designations where insertId=?',
        [result.insertId]
    )

    res.status(200).json(inserted[0])
}

exports.update = async (req, res) => {
    let {id} = req.params
    
    let {name, departmentId} = req.body

    if (!name && !departmentId) return res.sendStatus(400)

    if (departmentId && !(await hasDepartment(departmentId))) 
    return res.status(400).send("No such department")

    let value = {}
    if (name) value.name = name
    if (departmentId) value.department_id = departmentId
    console.log(value)
    let [results, fields] = await con.promise().query(
`update designations set ?\
where id=?\
`, [value, id]
    )

    console.log(results)
    console.log(fields)

    if (results.affectedRows > 0) res.sendStatus(202)
    else res.status(400).send("No such designation")
}

exports.delete = async(req, res) => {

    let {id} = req.params
    if (!id) return res.sendStatus(400)

    let [results] = await con.promise().query(
        'update designations set deleted_at=? where id=?',
        [format(new Date(), 'yyyy-MM-dd'), id]
    )

    res.sendStatus(204)
}

// Check if a department with id exists
async function hasDepartment(id) {
    let [results] = await con.promise().query(
        'select * from departments where id=?', [id]
    )
    console.log(results)
    console.log(results.length)
    return results.length === 1
}