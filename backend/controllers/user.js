const {format} = require('date-fns')
const db = require('../mysql')
const {randomUUID: uuid} = require('crypto')

const userdao = require('../dao/users')

exports.getAll = async (req, res) => {
    let [users] = await userdao.getAll()
    res.json(users)
}

exports.get = async (req, res) => {
    let { id } = req.params
    let user = await userdao.getById(id)
    console.log(user)
    if (user) res.json(user)
    else res.sendStatus(400)
}


exports.store = async (req, res) => {

    let newUser = req.body

    let requiredKeys = ['username', 'work_email', 'password', 'role_id']

    newUser.id = undefined // remove id

    // get missing keys i.e key with false value
    let missingKeys = requiredKeys.filter((k) => !newUser[k])
    // if any mandatory key is missing, fail with error
    for (const each of missingKeys) {
        return res.status(400).send(`'${each}' is missing`)
    }

    let dateRegex = /^\d{4}-\d{1,2}-\d{1,2}$/
    if (newUser.dob) {
        // if unwanted format
        if (!dateRegex.test(newUser.dob))
            return res.status(400).send('Invalid dob')
        // if invalid date range
        if (isNaN(new Date(newUser.dob)))
            return res.status(400).send('Invalid dob')
    }

    await userdao.insert(newUser)

    res.sendStatus(202)
}

exports.update = async (req, res) => {
    res.sendStatus(202)
}

exports.delete = async(req, res) => {
    res.sendStatus(202)
}