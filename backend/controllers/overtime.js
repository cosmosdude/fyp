const db = require('../mysql');
const {randomUUID: uuid} = require('crypto');
const { format } = require('date-fns');
//const {format} = require('date-fns');
const z = require('zod');
const { getWeek, getMonth } = require('../utils/date');
const apns = require('../utils/apns');

exports.getAllRequests = async (req, res) => {
    let [requests] = await db.promise().query(/*sql*/`
        select 
        uor.*,

        u1.first_name as requester_first_name, 
        u1.last_name as requester_last_name,
        f1.path as requester_avatar_path,

        u2.first_name as recipient_first_name, 
        u2.last_name as recipient_last_name,
        f2.path as recipient_avatar_path,

        u3.first_name as responder_first_name, 
        u3.last_name as responder_last_name,
        f3.path as responder_avatar_path

        from users_overtimes_requests as uor
        left join users as u1 on u1.id=uor.requester_id
        left join files as f1 on u1.avatar_id=f1.id
        left join users as u2 on u2.id=uor.recipient_id
        left join files as f2 on u2.avatar_id=f2.id
        left join users as u3 on u3.id=uor.responder_id
        left join files as f3 on u3.avatar_id=f3.id
    `)
    res.json(requests)
}

exports.getMyRequests = async (req, res) => {
    let auth = req.authUser

    let [requests] = await db.promise().query(/*sql*/`
        select 
        uor.*,

        u1.first_name as requester_first_name, 
        u1.last_name as requester_last_name,
        f1.path as requester_avatar_path,

        u2.first_name as recipient_first_name, 
        u2.last_name as recipient_last_name,
        f2.path as recipient_avatar_path,

        u3.first_name as responder_first_name, 
        u3.last_name as responder_last_name,
        f3.path as responder_avatar_path

        from users_overtimes_requests as uor
        join users as u1 on u1.id=uor.requester_id
        left join files as f1 on u1.avatar_id=f1.id
        join users as u2 on u2.id=uor.recipient_id
        left join files as f2 on u2.avatar_id=f2.id
        left join users as u3 on u3.id=uor.responder_id
        left join files as f3 on u3.avatar_id=f3.id
        where uor.requester_id=?
    `, [auth.id])
    res.json(requests)
}

exports.requestDetail = async (req, res) => {
    let auth = req.authUser
    let { id } = req.params

    let [requests] = await db.promise().query(/*sql*/`
        select 
        uor.*,

        u1.first_name as requester_first_name, 
        u1.last_name as requester_last_name,
        f1.path as requester_avatar_path,

        u2.first_name as recipient_first_name, 
        u2.last_name as recipient_last_name,
        f2.path as recipient_avatar_path,

        u3.first_name as responder_first_name, 
        u3.last_name as responder_last_name,
        f3.path as responder_avatar_path

        from users_overtimes_requests as uor
        join users as u1 on u1.id=uor.requester_id
        left join files as f1 on u1.avatar_id=f1.id
        join users as u2 on u2.id=uor.recipient_id
        left join files as f2 on u2.avatar_id=f2.id
        left join users as u3 on u3.id=uor.responder_id
        left join files as f3 on u3.avatar_id=f3.id
        where uor.id=?
    `, id)
    if (!requests[0]) res.status(404).send("Not request found")
    else res.json(requests[0])
}

exports.requestOT = async (req, res) => {
    let auth = req.authUser
    let data = {}
    console.log(req.body)

    // validate form
    try {
        data = z.object({
            date: z.coerce.date(),
            duration: z.coerce.number().min(15).max(120),
            recipient_id: z.string(),
            request_msg: z.string().optional(),
        }).parse(req.body)
    } catch (error) {
        return res.zod.sendError(error)
    }

    // == auth user ==
    let requester = (await db.promise().query(/*sql*/`
        select * from users where id=?
    `, auth.id))[0]?.[0]

    // create ot request
    let [otInsertion] = await db.promise().query(/*sql*/`
        insert into users_overtimes_requests
        set ?
    `, [{
        date: data.date,
        requester_id: auth.id,
        recipient_id: data.recipient_id,
        request_msg: data.request_msg,
        duration_sec: data.duration * 60,
    }])

    let otReq = (await db.promise().query(/*sql*/`
        select * from users_overtimes_requests where iid=?
    `, otInsertion.insertId))[0]?.[0]

    // create noti
    await db.promise().query(/*sql*/`
        insert into users_notifications
        set ?
    `, [{
        user_id: data.recipient_id, // <- target user is recipient
        title: "Overtime",
        body: `${requester.first_name} has requested overtime.`,
        overtime_request_id: otReq.id,
        type: 'overtime_request'
    }])

    // send noti
    apns.send({
        title: "Overtime",
        body: `${requester.first_name} has requested overtime.`,
        payload: {
            user_id: data.recipient_id,
            overtime_request_id: otReq.id,
            type: 'overtime_request'
        }
    })

    res.json(otReq)
    // res.send("requestOT")
}

exports.respondOT = async (req, res) => {
    let {id} = req.params
    let auth = req.authUser

    let data = {}
    try {
        data = z.object({
            status: z.enum(['approved','rejected']),
            response_msg: z.string().optional()
        }).parse(req.body)
    } catch(error) { res.zod.sendError(error) }

    // Get Responder (Auth User)
    let responder = (await db.promise().query(/*sql*/`
        select * from users where id=?
    `, auth.id))[0]?.[0]

    await db.promise().query(/*sql*/`
        update users_overtimes_requests set ? where id=?
    `, [{
        ...data,
        responded_at: new Date()
    }, id])

    let otReq = (await db.promise().query(/*sql*/`
        select * from users_overtimes_requests where id=?
    `, id))[0]?.[0]

    if (!otReq) return res.status(400).send("No such request")

    // create noti
    await db.promise().query(/*sql*/`
        insert into users_notifications
        set ?
    `, [{
        user_id: otReq.requester_id, // <- target user is original requester
        title: "Overtime",
        body: `Overtime request has been ${data.status} by ${responder.first_name}.`,
        overtime_request_id: otReq.id,
        type: 'overtime_request'
    }])

    // send noti
    apns.send({
        title: "Overtime",
        body: `Overtime request has been ${data.status} by ${responder.first_name}.`,
        payload: {
            user_id: otReq.requester_id,
            overtime_request_id: otReq.id,
            type: 'overtime_request'
        }
    })

    res.sendStatus(202)
}

exports.getTotalOvertime = async(req, res) => {
    let auth = req.authUser
    let { id } = req.params

    if (!id) id = auth.id

    let now = new Date()
    
    let [today] = await db.promise().query(/*sql*/`
        select SUM(duration_sec) as total
        from users_overtimes_requests
        where status='approved' and requester_id=? and date=?
    `, [auth.id, format(now, 'yyyy-MM-dd')])

    let week = getWeek()

    let [thisWeek] = await db.promise().query(/*sql*/`
        select SUM(duration_sec) as total
        from users_overtimes_requests
        where status='approved' and requester_id=? and date>=? and date<=?
    `, [auth.id, format(week[0], 'yyyy-MM-dd'), format(week[6], 'yyyy-MM-dd')])

    let month = getMonth()

    let [thisMonth] = await db.promise().query(/*sql*/`
        select SUM(duration_sec) as total
        from users_overtimes_requests
        where status='approved' and requester_id=? and date>=? and date<=?
    `, [auth.id, format(month[0], 'yyyy-MM-dd'), format(month[month.length - 1], 'yyyy-MM-dd')])

    let data = {
        today_sec: Number(today[0].total),
        week_sec: Number(thisWeek[0].total),
        month_sec: Number(thisMonth[0].total)
    }

    res.json(data)
}

exports.getMonthlyOvertime = async (req, res) => {
    let month = getMonth()

    let [users] = await db.promise().query(/*sql*/`
        select distinct requester_id
        from users_overtimes_requests
        where status='approved' and date>=? and date<=?
        group by requester_id
    `, [format(month[0], 'yyyy-MM-dd'), format(month[month.length - 1], 'yyyy-MM-dd')])

    // return res.json(users)

    let [thisMonthTotal] = await db.promise().query(/*sql*/`
        select SUM(duration_sec) as total
        from users_overtimes_requests
        where status='approved' and date>=? and date<=?
    `, [format(month[0], 'yyyy-MM-dd'), format(month[month.length - 1], 'yyyy-MM-dd')])

    thisMonthTotal = thisMonthTotal[0].total

    let [statistic] = await db.promise().query(/*sql*/`
        select status, COUNT(status) as count
        from users_overtimes_requests
        where date>=? and date<=?
        group by status
    `, [format(month[0], 'yyyy-MM-dd'), format(month[month.length - 1], 'yyyy-MM-dd')])

    // return res.json(statistic)

    res.json({
        user_total: Number(users.length),
        month_total_sec: Number(thisMonthTotal),
        statistic
    })
}