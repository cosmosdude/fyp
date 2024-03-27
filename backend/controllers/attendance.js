const db = require('../mysql');
const {randomUUID: uuid} = require('crypto');
const {format} = require('../utils/datefns-fast-wrapper');
const z = require("zod")

/**
 * Get all attendance records
*/
exports.getAll = async (req, res, next) => {

    let data = req.query
    // try {
    //     data = z.object({
    //         from: z.coerce.date().optional(),
    //         to: z.coerce.date().optional()
    //     }).parse(req.query)
    // } catch (error) { return res.zod.sendError(error) }

    data.from = new Date(data.from)
    if (isNaN(data.from)) data.from = new Date() 

    data.to = new Date(data.to)
    if (isNaN(data.to)) data.to = new Date()
    
    // if no from date, assume current date
    // if (!data.from) data.from = new Date()
    // if no to date, assume the same as from date
    // if (!data.to) data.to = data.from

    let [requests] = await db.promise().query(/*sql*/`
        select 
            ua.*,
            u.first_name, u.last_name,
            f.path as avatar_path,
            ds.name as designation_name,
            dp.name as department_name,
            (h.date is not null) as is_holiday,
            h.name as holiday_name,
            (ulr.id is not null) as is_on_leave,
            l.name as leave_name
        from users_attendances as ua
        left join users as u on ua.user_id=u.id
        left join files as f on u.avatar_id=f.id
        left join designations as ds on ds.id=u.designation_id
        left join departments as dp on dp.id=u.department_id
        left join (
            select * from holidays
        ) as h on h.date=ua.date 
        left join (
            select * from users_leaves_requests
            where 
                status='approved'
        ) as ulr on ulr.requester_id=u.id and ulr.from_date>=ua.date and ulr.to_date<=ua.date
        left join leaves as l on l.id=ulr.leave_id
        where ua.date >= ? and ua.date <= ?
        order by ua.date desc, u.first_name asc
        limit 366
    `, [
        format(data.from, 'yyyy-MM-dd'), format(data.to, 'yyyy-MM-dd')
    ])

    res.json(requests)
}

exports.getMyAttendances = async (req, res, next) => {

    let auth = req.authUser
    let data = {
        from: new Date(req.query.from),
        to: new Date(req.query.to)
    }
    // let data = {}
    // try {
    //     data = z.object({
    //         from: z.coerce.date().optional(),
    //         to: z.coerce.date().optional()
    //     }).parse(req.query)
    // } catch (error) { return res.zod.sendError(error) }

    // return res.json(data)
    
    // if no from date, assume current date
    if (isNaN(data.from)) data.from = new Date()

    // if no to date, assume the same as from date
    if (isNaN(data.to)) data.to = new Date(data.from.getTime())

    let fromDate = format(data.from, 'yyyy-MM-dd')
    let toDate = format(data.to, 'yyyy-MM-dd')

    // return res.json({fromDate, toDate})

    let [records] = await db.promise().query(/*sql*/`
        select 
            ua.*,
            u.first_name, u.last_name,
            h.name as holiday_name,
            h.id as holiday_id,
            (h.id is not null) as "is_holiday",
            (ulr.id is not null) as "is_on_leave",
            leaves.name as "leave_name"
        from users_attendances as ua
        left join users as u on ua.user_id=u.id
        left join (
            select * from holidays
        ) as h on h.date=ua.date
        left join (
            select * from users_leaves_requests
            where status="approved"
        ) as ulr on ulr.from_date<=ua.date and ulr.to_date>=ua.date and ulr.requester_id=ua.user_id
        left join leaves on ulr.leave_id=leaves.id
        where ua.user_id=? and ua.date>=? and ua.date<=?
        order by ua.date desc
        limit 365
    `, [
        auth.id, fromDate, toDate // where line
    ])

    res.json(records)
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

        order by uar.date desc, uar.type asc, uar.time desc
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

    {
        let value = {
            user_id: requester.id,
            date: data.date,
            start_at: schedule.start_at, // <- planned start time
            end_at: schedule.end_at, // <- planned end time
            break_seconds: schedule.break_seconds
        }
        await db.promise().query(/*sql*/`
            insert into users_attendances
            set ? on duplicate key update ?
        `, [value, value])
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

    // update attendance data if approved
    if (data.status === 'approved') {
        await db.promise().query(/*sql*/`
            update users_attendances
            set ${request.type === 'checkin' ? 'checkin_at' : 'checkout_at'}=?
            where user_id=? and date=?
        `, [
            request.time,
            request.requester_id, format(request.date, 'yyyy-MM-dd')
        ])
    }
    

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

