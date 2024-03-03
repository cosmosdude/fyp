const {format} = require('date-fns')
const db = require('../mysql')
const {randomUUID: uuid} = require('crypto')

exports.getAll = async (req, res) => {
    let [results] = await db.promise().query('select * from users')
    res.json(results)
}

exports.get = async (req, res) => {
    let { id } = req.params
    let [results] = await db.promise().query(
        'select * from users where id=?',
        [id]
    )

    if (results.length > 0) res.json(results[0])
    else res.sendStatus(400)
}

exports.store = async (req, res) => {

    // let { 
    //     firstname,
    //     lastname,
    //     username,
    //     email,
    //     phone,
    //     gender,
    //     work_email,
    //     work_phone,
    //     password,
    //     emergency_name1,
    //     emergency_relation1,
    //     emergency_number1,
    //     emergency_name2,
    //     emergency_relation2,
    //     emergency_number2,
    //     dob, status, 
    //     role_id, department_id, designation_id
    // } = req.body

    let missingKeys = ['username', 'work_email', 'password', 'role_id']
        .filter((k) => !req.body[k])

    console.log(missingKeys)

    for (const each of missingKeys) {
        return res.status(400).send(`'${each}' is missing`)
    }

    console.log("original:", req.body)
    console.log("username is:", req.body.username)
    console.log("username is:", !"aklsdhfkljasdf")
    console.log("Set Object", Object.fromEntries(
        Object.entries(req.body)
            .filter((k, v) => v)
    ))

    // let [results] = db.promise().query(
    //     'insert into users set',
    //     [
            
    //     ]    
    // )

    res.sendStatus(202)
}

// function missingKeys(obj, keys) {
//     var missingKeys = []
//     for (const key of keys) {
//         if (!obj[key]) missingKeys.push(key)
//     }
//     return missingKeys
// }

exports.update = async (req, res) => {
    res.sendStatus(202)
}

exports.delete = async(req, res) => {
    res.sendStatus(202)
}