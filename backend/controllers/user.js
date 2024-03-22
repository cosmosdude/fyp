const {format} = require('date-fns')
const db = require('../mysql')
const {randomUUID: uuid} = require('crypto')
const md5 = require('md5')
const {validate: isEmail} = require('email-validator')

const fs = require('fs')

const z = require('zod')

const { moveToUploads, removeFile } = require('../services/fileHandling')

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

    try {
        newUser = z.object({
            username: z.string().min(8),
            password: z.string().min(8),
            first_name: z.string().min(1),
            dob: z.coerce.date().optional(),
            gender: z.enum(['Male', 'Female', 'Unspecified']).default('Unspecified'),
            email: z.string().email().optional(),
            work_email: z.string().email().optional(),
            role_id: z.coerce.number().default(4)
        })
        .passthrough()
        .parse(req.body)
    } catch(error) { return res.zod.sendError(error) }

    // if required check is done
    // undefine some fields so that they don't make into the db
    newUser.id = undefined
    // remove deleted_at so that user is not automatically deleted
    newUser.deleted_at = undefined
    newUser.status = 'active'

    // return res.json(newUser)

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

    if (newUser.work_email && !isEmail(newUser.work_email))
    return res.status(400).send("work_email is not a valid email address.")


    // if invalid date range
    if (isNaN(new Date(newUser.dob))) return res.status(400).send('Invalid dob')

    // # Report To
    if (newUser.report_to) {
        let [users] = await db.promise().query(/*sql*/`
            select * from users where id=?
        `, newUser.report_to)

        if (users.length < 1) return res.status(400).send('No such user')
    }

    // # Department
    if (newUser.department_id) {
        let [departments] = await db.promise().query(/*sql*/`
            select * from departments where id=?
        `, newUser.department_id)

        if (departments.length < 1) return res.status(400).send('No such department')
    }
    // # Designation
    if (newUser.designation_id) {
        let [designations] = await db.promise().query(/*sql*/`
            select * from designations where id=?
        `, newUser.designation_id)

        if (designations.length < 1) return res.status(400).send('No such designation')
    }
    // newUser.designation_id = null

    // # role
    if (newUser.role_id) {
        let [roles] = await db.promise().query(/*sql*/`
            select * from roles where id=?
        `, newUser.role_id)

        if (roles.length < 1) return res.status(400).send('No such role')
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
    let rules = z.object({
        password: z.string().min(8).optional(),

        first_name: z.string().min(1).optional(),
        last_name: z.string().optional(),
        dob: z.coerce.date().optional(),
        gender: z.enum(['Male', 'Female', 'Unspecified']).optional(),
        email: z.string().email().optional(),
        phone: z.string().optional(),
        address: z.string().optional(),
        
        work_email: z.string().email().optional(),
        work_phone: z.string().optional(),
        department_id: z.string().optional(),
        designation_id: z.string().optional(),

        emergency_name1: z.string().optional(),
        emergency_number1: z.string().optional(),
        emergency_relation1: z.string().optional(),

        emergency_name2: z.string().optional(),
        emergency_number2: z.string().optional(),
        emergency_relation2: z.string().optional(),
        
        status: z.enum(['active', 'deactive']).optional()
    })

    // Validate fields
    let zodResult = rules.safeParse(req.body)
    if (!zodResult.success) {
        return res.status(400).json(zodResult.error.issues.map(i => {
            return `${i.path.toString()}: ${i.message}`
        }))
    }

    // validated fields
    // user info that is about be updated
    let updatingUser = zodResult.data

    // if password exists, hash it
    if (updatingUser.password) 
    updatingUser.password = md5(updatingUser.password)
    // user id
    let { id } = req.params

    // Test user existence
    console.log("id", id)
    let user = await userdao.getById(id)
    console.log("user", user)
    if (!user) return res.status(400).send("No user available.")

    // # Report To
    if (updatingUser.report_to) {
        let [users] = await db.promise().query(/*sql*/`
            select * from users where id=?
        `, updatingUser.report_to)

        if (users.length < 1) return res.status(400).send('No such user')
    }

    // # Department
    if (updatingUser.department_id) {
        let [departments] = await db.promise().query(/*sql*/`
            select * from departments where id=?
        `, updatingUser.department_id)

        if (departments.length < 1) return res.status(400).send('No such department')
    }

    // # Designation
    if (updatingUser.designation_id) {
        let [designations] = await db.promise().query(/*sql*/`
            select * from designations where id=?
        `, updatingUser.designation_id)

        if (designations.length < 1) return res.status(400).send('No such designation')
    }
    // newUser.designation_id = null

    // # role
    if (updatingUser.role_id) {
        let [roles] = await db.promise().query(/*sql*/`
            select * from roles where id=?
        `, updatingUser.role_id)

        if (roles.length < 1) return res.status(400).send('No such role')
    }

    // if avatar is given
    if (req.files['avatar']?.[0]) {
        // if current avatar_id exists
        if (user.avatar_id) {
            let [theFile] = await filedao.getById(user.avatar_id)
            console.log("Current Avatar:", theFile?.[0])
            // remove it from file system
            removeFile(theFile?.[0]?.path, err => console.log("Remove Error", err))
            // delete it from db.
            filedao.deleteById(user.avatar_id)
        }

        // save given file to public/uploads
        // and add to db
        let moveResult = await saveFile(req.files['avatar']?.[0])
        // get the saved file id as avatar_id
        updatingUser.avatar_id = moveResult?.insertId
    }
    // remov

    // if contract is given
    if (req.files['employment_contract']?.[0]) {
        // if current employment_agreement_id exists
        if (user.employment_agreement_id) {
            let [theFile] = await filedao.getById(user.employment_agreement_id)
            console.log("Current Employment Agreement:", theFile?.[0])
            // remove it from file system
            removeFile(theFile?.[0]?.path, err => console.log("Remove Error", err))
            // delete it from db.
            filedao.deleteById(user.employment_agreement_id)
        }

        // save given file to public/uploads
        let moveResult = await saveFile(req.files['employment_contract']?.[0])
        updatingUser.employment_agreement_id = moveResult?.insertId
    }

    let [updateResult] = await userdao.update(id, updatingUser)
    
    if (updateResult.affectedRows > 0) {
        res.json((await db.promise().query(/*sql*/`
            select * from users where id=?
        `, id))?.[0]?.[0])
    } else return res.sendStatus(500)

    // res.status(201).json(updateResult)
    // res.sendStatus(201)
}

exports.delete = async(req, res) => {
    let { id } = req.params
    let [results] = await userdao.delete(id)
    console.log(results)
    if (results.affectedRows !== 1) 
        return res.status(400).send("unable to delete user.")    
    res.sendStatus(204)
}

// MARK: Report To
exports.getManagers = async (req, res) => {
    let auth = req.authUser

    // Query auth user detail
    let [users] = await db.promise().query(/*sql*/`
        select *from users where id=?
    `, auth.id)
    let theUser = users[0]
    if (!theUser) return res.status(401).send("User not found")

    let ids = theUser.report_to

    let [managers] = await db.promise().query(/*sql*/`
        select 
            u.id,
            u.first_name, u.last_name, 
            f.path as avatar_path ,
            dep.name as department,
            des.name as designation
        from users as u
        left join files as f on u.avatar_id=f.id
        left join departments as dep on dep.id=u.department_id
        left join designations as des on des.id=u.designation_id
        where u.id in (?)
    `, [ids])

    res.json(managers)
}

exports.getAllHRs = async (req, res) => {
    let [hrs] = await db.promise().query(/*sql*/`
        select 
            u.id,
            u.first_name, u.last_name, 
            f.path as avatar_path,
            r.name,
            dep.name as department,
            des.name as designation
        from users as u
        join (
            select * from roles 
            where name in ('admin', 'hr') 
        ) as r on r.id=u.role_id
        left join files as f on u.avatar_id=f.id
        left join departments as dep on dep.id=u.department_id
        left join designations as des on des.id=u.designation_id
    `)

    res.json(hrs)
}

exports.getAllManagers = async (req, res) => {
    let [hrs] = await db.promise().query(/*sql*/`
        select 
            u.id,
            u.first_name, u.last_name, 
            f.path as avatar_path,
            r.name
        from users as u
        join (
            select * from roles 
            where name in ('admin', 'manager') 
        ) as r on r.id=u.role_id
        left join files as f on u.avatar_id=f.id
    `)

    res.json(hrs)
}

/**
     * Save file to public/uploads and insert into files table.
     * 
     * @returns Insertion info.
    */
async function saveFile(file) {
    if (!file) return undefined
    let moved = moveToUploads(file) || {}
    console.log("Avatar", moved)
    // insert the file
    let [fileResult] = await filedao.insert({
        original_name: moved.originalFilename,
        name: moved.uuidFilename,
        extension: moved.extension,
        path: moved.uploadedFilepath,
        mime: moved.mimetype,
        size: moved.size
    })
    console.log("Insert File result:", fileResult)  

    return fileResult
}
