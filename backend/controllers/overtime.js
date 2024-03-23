const db = require('../mysql');
const {randomUUID: uuid} = require('crypto');
//const {format} = require('date-fns');
const z = require('zod')

exports.getAllRequests = async (req, res) => {
    let [requests] = await db.promise().query(/*sql*/`
        select * from users_overtimes_requests
    `)
    res.json(requests)
}

exports.getMyRequests = async (req, res) => {
    let auth = req.authUser

    let [requests] = await db.promise().query(/*sql*/`
        select * from users_overtimes_requests where requester_id=?
    `, [auth.id])
    res.json(requests)
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

    res.json(otReq)
    // res.send("requestOT")
}

exports.respondOT = async (req, res) => {
    res.send("respondOT")
}