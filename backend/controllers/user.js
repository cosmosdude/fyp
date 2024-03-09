const {format} = require('date-fns')
const db = require('../mysql')
const {randomUUID: uuid} = require('crypto')
const md5 = require('md5')
const {validate: isEmail} = require('email-validator')

const moveToUploads = require('../services/moveToUploads')

const userdao = require('../dao/users')
const filedao = require('../dao/files')

exports.getAll = async (req, res) => {
    let [users] = await userdao.getAll()
    res.json(users)
}

exports.get = async (req, res) => {
    let { id } = req.params
    console.log('user-id', id)
    let user = await userdao.getById(id)
    console.log(user)
    if (user) res.json(user)
    else res.sendStatus(400)
}

exports.getMe = async (req, res) => {
    let { data } = req.authentication
    // normal get api requires path variable :id
    // so assign it
    req.params.id = data.id
    // then just transfer control
    return await this.get(req, res)
}

exports.store = async (req, res) => {
    (function() {
        console.log("This function is called")
    })()

    let newUser = req.body || {}
    newUser.role_id = newUser.role_id || 4

    let requiredKeys = ['username', 'work_email', 'password', 'role_id']

    // get missing keys i.e key with false value
    let missingKeys = requiredKeys.filter((k) => !newUser[k])
    // if any mandatory key is missing, fail with error
    for (const each of missingKeys) {
        return res.status(400).send(`'${each}' is missing`)
    }
    // if required check is done
    // undefine some fields so that they don't make into the db
    newUser.id = undefined
    // remove deleted_at so that user is not automatically deleted
    newUser.deleted_at = undefined

    // # validate username
    // try to get user with given username
    let sameUser = await userdao.getByUsername(newUser.username)
    // if user exists, it already exists
    if (sameUser) 
    return res.status(400).send("username already taken")

    // validate password
    if (newUser.password.length < 8) 
    return res.status(400).send("Password must be at least 8 characters long")

    // hash the password.
    newUser.password = md5(newUser.password)

    if (!isEmail(newUser.email))
    return res.status(400).send("email is not a valid email address.")

    if (!isEmail(newUser.work_email))
    return res.status(400).send("work_email is not a valid email address.")

    // validate dob
    let dateRegex = /^\d{4}-\d{1,2}-\d{1,2}$/
    if (newUser.dob) {
        // if unwanted format
        if (!dateRegex.test(newUser.dob))
            return res.status(400).send('Invalid dob')
        // if invalid date range
        if (isNaN(new Date(newUser.dob)))
            return res.status(400).send('Invalid dob')
    }

    // # Department
    newUser.department_id = null
    // # Designation
    newUser.designation_id = null

    // # Files

    async function saveFile(file) {
        if (!file) return undefined
        let moved = moveToUploads(file) || {}
        console.log("Avatar", moved)
        // insert the file
        let [fileResult] = await filedao.insert({
            original_name: moved.originalName,
            name: moved.uuidFilename,
            extension: moved.extension,
            path: moved.uploadedFilepath,
            mime: moved.mimetype,
            size: moved.size
        })
        console.log("Insert File result:", fileResult)  

        return fileResult
    }

    // # Avatar
    // extract avatar from the files list.
    // only the first avatar is interested.
    // Save that avatar to db.
    newUser.avatar_id = (
        await saveFile(req.files['avatar']?.[0])
    )?.insertId

    newUser.employment_agreement_id = (
        await saveFile(req.files['employment_contract']?.[0])
    )?.insertId

    let [result] = await userdao.insert(newUser)

    let [users] = await userdao.getByInsertId(result.insertId)

    res.status(202).json(users[0])
}

exports.update = async (req, res) => {

    let { id } = req.params

    user = { ...req.body }

    // remove unwanted fields first
    user.id = undefined // remove id
    user.username = undefined // remove username override

    // # validate fields

    // # vaidate email
    if (user.email && !isEmail(user.email))
    return res.status(400).send("email is not a valid email address.")

    // # validate work_email
    if (user.work_email && !isEmail(user.work_email))
    return res.status(400).send("work_email is not a valid email address.")

    // # validate password
    if (user.password) {
        // test password length
        if (user.password.length < 8)
        return res.status(400).send("Password must be at least 8 characters long")

        // hash the password
        user.password = md5(user.password)
    }
    
    // # validate DOB
    let dateRegex = /^\d{4}-\d{1,2}-\d{1,2}$/
    if (user.dob) {
        // if unwanted format
        if (!dateRegex.test(user.dob))
            return res.status(400).send('DOB must be in format yyyy-MM-dd')
        // if invalid date range
        if (isNaN(new Date(user.dob)))
            return res.status(400).send('Invalid DOB range.')
    }

    console.log('updating user id', id)
    // update user
    let [result] = await userdao.update(id, user)
    console.log(result)
    if (result.affectedRows !== 1)
    return res.status(400).send("No user found")

    res.sendStatus(202)
}

exports.delete = async(req, res) => {
    let { id } = req.params
    let [results] = await userdao.delete(id)
    console.log(results)
    if (results.affectedRows !== 1) 
        return res.status(400).send("unable to delete user.")

    
    res.sendStatus(204)
}