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
        left join users as u1 on u1.id=uor.requester_id
        left join files as f1 on u1.avatar_id=f1.id
        left join users as u2 on u2.id=uor.recipient_id
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

    res.sendStatus(202)
}