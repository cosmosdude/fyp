const db = require('../mysql');
const {randomUUID: uuid} = require('crypto');
// const {format} = require('date-fns');
const z = require("zod")

exports.getAll = async (req, res, next) => {
    res.send("getAll")
}

exports.getAllAttendanceRequests = async (req, res, next) => {
    let [requests] = await db.promise().query(/*sql*/`
        select 
            uar.*, 
            u.first_name, u.last_name, 
            u.avatar_path 
        from users_attendances_requests as uar
        left join (
            select u.*, f.path as avatar_path from users as u
            left join files as f on u.avatar_id=f.id
        ) as u on uar.requester_id=u.id
    `)
    res.json(requests)
}

exports.getMyAttendanceRequests = async (req, res, next) => {
    let auth = req.authUser
    let [requests] = await db.promise().query(/*sql*/`
        select 
            uar.*, 
            u.first_name, u.last_name, 
            u.avatar_path 
        from users_attendances_requests as uar
        left join (
            select u.*, f.path as avatar_path from users as u
            left join files as f on u.avatar_id=f.id
        ) as u on uar.requester_id=u.id
        where uar.requester_id=?
    `, auth.id)
    res.json(requests)
}

exports.requestAttendance = async (req, res, next) => {
    let auth = req.authUser

    // validate req.body
    let data = {}
    try {
        data = z.object({
            date: z.coerce.date().optional(),
            time: z.string(), // currently not enforced
            type: z.enum(['checkin', 'checkout']),
            recipient_id: z.string(),
            request_msg: z.string().optional()
        }).parse(req.body)
    } catch(error) { return res.zod.sendError(error) }

    // if date was not provided
    if (!data.date) data.date = new Date()

    // get requester info
    let requester = (await db.promise().query(/*sql*/`
        select * from users where id=?
    `, [auth.id]))[0]?.[0]
    // if requester does not exists (absurd), throw error
    if (!requester) return res.status(500).send("No such user")

    // get the week of day (1 ... 7) (sat ... sun)
    // db enums
    let days = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'] 
    // NOTE: db enum value is in 1-7 range
    // Date.getDay() return (0-6)
    let day = days[data.date.getDay()]

    // get schedule of user for given day
    // pk = (user_id, day)
    let schedule = (await db.promise().query(/*sql*/`
        select * from users_shifts where user_id=? and day=?
    `, [requester.id, day]))[0]?.[0]

    if (!schedule) return res.status(500).send()

    // insert data
    let [insertion] = await db.promise().query(/*sql*/`
        insert into users_attendances_requests
        set ?
    `,[{
        ...data,
        requester_id: requester.id
    }])

    let inserted = (await db.promise().query(/*sql*/`
        select * from users_attendances_requests
        where iid=?
    `, insertion.insertId))[0]?.[0]
    
    // send notification
    await db.promise().query(/*sql*/`
        insert into users_notifications
        set ?
    `, {
        user_id: data.recipient_id, // <- send to recipient
        title: "Attendance",
        body: `${requester.first_name} has made an attendance request.`,
        type: "attendance_request",
        attendance_request_id: inserted.id
    })

    res.json(inserted)

    // res.send("requestAttendance")
}

exports.respondAttendanceRequest = async (req, res, next) => {
    res.send("respondAttendanceRequest")
}

