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
    let newUser = req.body
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

    if (newUser.email && !isEmail(newUser.email))
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

    // # Files

    // # Avatar
    // extract avatar from the files list.
    // only the first avatar is interested.

    // Initially clear the avatar ID
    // so that no junk value made it into the db.
    newUser.avatar_id = null
    // Final value will be inserted avatar file id.
    // This value should not be null if uploaded file contains avatar
    // and it is inserted into the table after the move.
    //
    // null if there was no avatar.

    let avatar = null
    if (req.files['avatar']) avatar = req.files['avatar'][0]
    // Move avatar to uploads folder
    if (avatar) {
        let movedAvatar = moveToUploads(avatar) || {}
        console.log("Avatar", movedAvatar)
        // insert the file
        let [fileResult] = await filedao.insert({
            original_name: movedAvatar.originalName,
            name: movedAvatar.uuidFilename,
            extension: movedAvatar.extension,
            path: movedAvatar.uploadedFilepath,
            mime: movedAvatar.mimetype,
            size: movedAvatar.size
        })
        console.log("Insert File result:", fileResult)
        newUser.avatar_id = fileResult.insertId
    }
    
    /*
    {
        size: 3,
        filepath: '/var/folders/gm/ql3m_vqj4lz3b6wwyj8lr6jw0000gn/T/dd8abf5ea7e748ac8f4b32d00',
        newFilename: 'dd8abf5ea7e748ac8f4b32d00',
        mimetype: 'text/plain',
        mtime: undefined,
        originalFilename: 'hello.txt',
        uuidFilename: '000d1bda-517d-47b6-9ceb-8268b6726fc5',
        potentialFilename: '000d1bda-517d-47b6-9ceb-8268b6726fc5.txt',
        extension: 'txt',
        uploadedFilepath: '/Users/tha/Desktop/uni/uog/Project/GIT/Code/backend/public/uploads/000d1bda-517d-47b6-9ceb-8268b6726fc5.txt',
        uploadedFilename: '000d1bda-517d-47b6-9ceb-8268b6726fc5.txt'
    }
    */

    let [result] = await userdao.insert(newUser)

    let [users] = await userdao.getByInsertId(result.insertId)

    res.status(202).json(users[0])
    // res.sendStatus(202)
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