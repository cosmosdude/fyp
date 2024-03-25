const db = require('../mysql');
const {randomUUID: uuid} = require('crypto');
const {format} = require('../utils/datefns-fast-wrapper');
const z = require("zod")

/**
 * Get all attendance requests
*/
exports.getAll = async (req, res, next) => {

    let data = {}
    try {
        data = z.object({
            from: z.coerce.date().optional(),
            to: z.coerce.date().optional()
        }).parse(req.query)
    } catch (error) { return res.zod.sendError(error) }

    
    // if no from date, assume current date
    if (!data.from) data.from = new Date()
    // if no to date, assume the same as from date
    if (!data.to) data.to = data.from

    let [requests] = await db.promise().query(/*sql*/`
        select 
            ua.*,
            u.first_name, u.last_name
        from users_attendances as ua
        left join users as u on ua.user_id=u.id
        where ua.date >= ? and ua.date <= ?
        group by ua.date desc
        limit 366
    `, [
        format(data.from, 'yyyy-MM-dd'), format(data.to, 'yyyy-MM-dd')
    ])

    res.json(requests)
}

exports.getMyAttendances = async (req, res, next) => {

    let auth = req.authUser

    let data = {}
    try {
        data = z.object({
            from: z.coerce.date().optional(),
            to: z.coerce.date().optional()
        }).parse(req.query)
    } catch (error) { return res.zod.sendError(error) }

    
    // if no from date, assume current date
    if (!data.from) data.from = new Date()
    // if no to date, assume the same as from date
    if (!data.to) data.to = data.from

    let [requests] = await db.promise().query(/*sql*/`
        select 
            ua.*,
            u.first_name, u.last_name
        from users_attendances as ua
        left join users as u on ua.user_id=u.id
        where ua.user_id=? and ua.date >= ? and ua.date <= ?
        group by ua.date desc
        limit 366
    `, [
        auth.id,
        format(data.from, 'yyyy-MM-dd'), format(data.to, 'yyyy-MM-dd')
    ])

    res.json(requests)
}

exports.getAllAttendanceRequests = async (req, res, next) => {
    let [requests] = await db.promise().query(/*sql*/`
        select 
            uar.*,

            u1.first_name as requester_first_name, 
            u1.last_name as requester_last_name,
            f1.path as requester_avatar_path,

            u2.first_name as recipient_first_name, 
            u2.last_name as recipient_last_name,
            f2.path as recipient_avatar_path,

            u3.first_name as responder_first_name, 
            u3.last_name as responder_last_name,
            f3.path as responder_avatar_path

        from users_attendances_requests as uar
        left join users as u1 on u1.id=uar.requester_id
        left join files as f1 on u1.avatar_id=f1.id
        left join users as u2 on u2.id=uar.recipient_id
        left join files as f2 on u2.avatar_id=f2.id
        left join users as u3 on u3.id=uar.responder_id
        left join files as f3 on u3.avatar_id=f3.id
    `)
    res.json(requests)
}

exports.getMyAttendanceRequests = async (req, res, next) => {
    let auth = req.authUser
    let [requests] = await db.promise().query(/*sql*/`
        select 
            uar.*,

            u1.first_name as requester_first_name, 
            u1.last_name as requester_last_name,
            f1.path as requester_avatar_path,

            u2.first_name as recipient_first_name, 
            u2.last_name as recipient_last_name,
            f2.path as recipient_avatar_path,

            u3.first_name as responder_first_name, 
            u3.last_name as responder_last_name,
            f3.path as responder_avatar_path

        from users_attendances_requests as uar
        left join users as u1 on u1.id=uar.requester_id
        left join files as f1 on u1.avatar_id=f1.id
        left join users as u2 on u2.id=uar.recipient_id
        left join files as f2 on u2.avatar_id=f2.id
        left join users as u3 on u3.id=uar.responder_id
        left join files as f3 on u3.avatar_id=f3.id
        where uar.requester_id=?
    `, auth.id)
    res.json(requests)
}

exports.attendanceRequestDetail = async (req, res, next) => {
    let { id } = req.params
    let [requests] = await db.promise().query(/*sql*/`
        select 
            uar.*,

            u1.first_name as requester_first_name, 
            u1.last_name as requester_last_name,
            f1.path as requester_avatar_path,

            u2.first_name as recipient_first_name, 
            u2.last_name as recipient_last_name,
            f2.path as recipient_avatar_path,

            u3.first_name as responder_first_name, 
            u3.last_name as responder_last_name,
            f3.path as responder_avatar_path

        from users_attendances_requests as uar
        left join users as u1 on u1.id=uar.requester_id
        left join files as f1 on u1.avatar_id=f1.id
        left join users as u2 on u2.id=uar.recipient_id
        left join files as f2 on u2.avatar_id=f2.id
        left join users as u3 on u3.id=uar.responder_id
        left join files as f3 on u3.avatar_id=f3.id
        where uar.id=?
    `, id)

    res.json(requests[0])
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
            request_msg: z.string().optional(),
            lat: z.coerce.number(),
            lng: z.coerce.number(),
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


    let [attendances] = (await db.promise().query(/*sql*/`
        select * from users_attendances
        where user_id=? and date=?
    `, [requester.id, format(data.date, 'yyyy-MM-dd')]))


    // if attendance record is not created yet,
    // create it
    if (attendances.length === 0) {
        await db.promise().query(/*sql*/`
            insert into users_attendances
            set ?
        `, [{
            user_id: requester.id,
            date: data.date,
            start_at: schedule.start_at, // <- planned start time
            end_at: schedule.end_at, // <- planned end time
            break_seconds: schedule.break_seconds
        }])
    }

    // insert request
    let [requestInsertion] = await db.promise().query(/*sql*/`
        insert into users_attendances_requests
        set ?
    `,[{
        ...data,
        requester_id: requester.id
    }])

    // get inserted request
    let insertedRequest = (await db.promise().query(/*sql*/`
        select * from users_attendances_requests
        where iid=?
    `, requestInsertion.insertId))[0]?.[0]
    
    // send notification
    await db.promise().query(/*sql*/`
        insert into users_notifications
        set ?
    `, {
        user_id: data.recipient_id, // <- send to recipient
        title: "Attendance",
        body: `${requester.first_name} has made an attendance request.`,
        type: "attendance_request",
        attendance_request_id: insertedRequest.id
    })

    res.json(insertedRequest)

    // res.send("requestAttendance")
}

exports.respondAttendanceRequest = async (req, res, next) => {
    let auth = req.authUser
    let { id } = req.params

    // validate body
    let data = {}
    try {
        data = z.object({
            status: z.enum(['approved','rejected']),
            response_msg: z.string().optional()
        }).parse(req.body)
    } catch(error) { res.zod.sendError(error) }

    // get responder
    let responder = (await db.promise().query(/*sql*/`
        select * from users where id=?
    `, [auth.id]))[0]?.[0]
    // if responder does not exists (possible), throw error
    if (!responder) return res.status(500).send("No such user")

    // get the request
    let request = (await db.promise().query(/*sql*/`
        select * from users_attendances_requests
        where id=?
    `, id))[0]?.[0]

    if (!request) return res.status(500).send("No such request")
    // TODO: check for status

    // update attendance request
    await db.promise().query(/*sql*/`
        update users_attendances_requests
        set ?
        where id=?
    `, [{
        ...data,
        responded_at: new Date()
    }, id])

    // update attendance data
    await db.promise().query(/*sql*/`
        update users_attendances
        set ${request.type === 'checkin' ? 'checkin_at' : 'checkout_at'}=?
        where user_id=? and date=?
    `, [
        request.time,
        request.requester_id, format(request.date, 'yyyy-MM-dd')
    ])

    // notify original requester
    await db.promise().query(/*sql*/`
        insert into users_notifications
        set ?
    `, [{
        user_id: request.requester_id, // <- send to original requester
        title: "Attendance",
        body: `${responder.first_name} has ${data.status} your attendance request.`,
        type: "attendance_request",
        attendance_request_id: request.id
    }])

    // res.send("respondAttendanceRequest")
    res.sendStatus(202)
}

