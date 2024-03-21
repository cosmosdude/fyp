const z = require('zod')
const db = require('../mysql')
const datefns = require('date-fns')

/**
 * Get all leave types.
*/
exports.getAll = async (req, res) => {
    let [results] = await db.promise().query(/*sql*/`
        select * from leaves
    `)
    res.json(results)
}

/**
 * Get the detail of a leave type.
*/
exports.get = async (req, res) => {
    let { id } = req.params
    
    let [result] = await db.promise().query(/*sql*/`
        select * from leaves where id=?
    `, [id])

    if (result.length === 0) return res.status(404).send("No such leave")

    res.json(result[0])
}

/**
 * Create a leave type.
*/
exports.create = async (req, res) => {

    let zResult = z.object({
        name: z.string().min(1),
        initial: z.coerce.number(), 
        max: z.coerce.number(), 
        gender: z.enum(['Male', 'Female', 'Unspecified', 'All']),
        halfday: z.coerce.number(), 
        carried: z.coerce.number(), 
        earnable: z.coerce.number()
    }).safeParse(req.body)

    if (!zResult.success) return res.zod.sendError(zResult.error)

    let data = zResult.data

    // insert it
    let [insertion] = await db.promise().query(/*sql*/`
        insert into leaves set ?
    `, [zResult.data])

    // get the results
    let [results] = await db.promise().query(/*sql*/`
        select * from leaves where iid=?
    `, [insertion.insertId])

    let newLeave = results[0]
    // # create record for each user

    // get all users
    let [users] = await db.promise().query(/*sql*/`
        select * from users
    `)

    // for each user, create new leave balance
    for (const user of users) {
        await db.promise().query(/*sql*/`
            insert into users_leaves
            set ?
        `, {
            user_id: user.id,
            leave_id: newLeave.id,
            balance: data.initial
        })
    }

    // send the newly created leave
    res.send(newLeave)
}

/**
 * Update a leave type
*/
exports.update = async (req, res) => {

    let { id } = req.params

    if (!id) return res.sendStatus(404)

    let zResult = z.object({
        name: z.string().min(1).optional(),
        initial: z.coerce.number().optional(), 
        max: z.coerce.number().optional(), 
        gender: z.enum(['Male', 'Female', 'Unspecified', 'All']).optional(),
        halfday: z.coerce.number().optional(), 
        carried: z.coerce.number().optional(), 
        earnable: z.coerce.number().optional(),
        enabled: z.coerce.number().optional()
    }).safeParse(req.body)

    if (!zResult.success) res.zod.sendError(zResult.error)

    let data = zResult.data
    // return res.json(data)

    await db.promise().query(/*sql*/`
        update leaves set ? where id=?
    `,[zResult.data, id])

    let [results] = await db.promise().query(/*sql*/`
        select * from leaves where id=?
    `, [id])

    res.send(results[0])
}

/**
 * Flag a leave type as deleted
*/
exports.delete = async (req, res) => {
    let { id } = req.params
    
    if (!id) return res.sendStatus(404)

    await db.promise().query(/*sql*/`
        update leaves set deleted_at=CURRENT_TIMESTAMP() where id=?
    `, id)

    let [results] = await db.promise().query(/*sql*/`
        select * from leaves where id=?
    `, [id])

    res.send(results[0])
}

// User Specific
// exports.getAllBalances = async (req, res) => {
//     let user = req.authentication.data
//     res.json(user)
// }

/**
 * Leave api related to each user.
*/
exports.user = {

    /**
     * Get balances of current user.
    */
    async getBalances(req, res) {

        // auth user info.
        let auth = req.authentication.data
        
        let [balances] = await db.promise().query(/*sql*/`
            select l.id, l.name, ul.balance,
            l.initial, l.max, l.gender, 
            l.halfday, l.carried, l.earnable
            from users_leaves as ul
            left join leaves as l on l.id=ul.leave_id
            where ul.user_id=? and l.deleted_at is NULL and l.enabled is true
        `, [auth.id])

        res.json(balances)
    },

    /**
     * Request leave
    */
    async request(req, res) {

        // auth user info.
        let auth = req.authentication.data

        let data;
        try {
            data = z.object({
                leave_id: z.string().min(1),
                from_date: z.coerce.date(),
                to_date: z.coerce.date().optional(),
                recipient_id: z.string().min(1),
                request_msg: z.string().optional(),
                halfday: z.enum(['am', 'pm', '']).optional()
            }).parse(req.body)
        } catch (error) { return res.zod.sendError(error) }

        // == set up ==
        // clear halfday if not available
        if (!data.halfday) data.halfday = null
        // if to date is not given, make it the same day as from_date
        if (!data.to_date) data.to_date = data.from_date

        // == leave == 

        // get leave setting
        let leaveSetting = (await db.promise().query(/*sql*/`
            select * from leaves where id=?
        `, data.leave_id))[0]?.[0]
        // if missing, end with error
        if (!leaveSetting) return res.status(400).send("No such leave")

        // == leave balance ==

        // get leave balance for user for specific leave
        let balanceData = (await db.promise().query(/*sql*/`
            select * from users_leaves where user_id=? and leave_id=?
        `, [auth.id, data.leave_id]))[0]?.[0]
        // if missing, end with error
        if (!balanceData) 
        return res.status(400).send("Missing leave data")

        // == Date ==

        // if start date is past the end date,
        // invalid date range
        if (data.from_date > data.to_date)
        res.status(400).send("Invalid date range")

        let requiredBalance = 0
        // calculate require balance

        let isSameDate = data.from_date <= data.to_date && data.from_date >= data.to_date
        // if both date are the same and halfday is specified
        // balance becomes only 0.5
        if (isSameDate && data.halfday) requiredBalance = 0.5
        else {
            // increase to_date by 1 day so that if the dates are the same
            // from_date becomes 'start of day'
            // while to_date becomes 'end of day'
            let endOfToDate = datefns.addDays(data.to_date, 1)
            // return res.send("Hello")
            let dateDiff = endOfToDate - data.from_date
            // update required balance
            requiredBalance = dateDiff / 86_400_000
        }

        // if not enough balance, end with error
        if (balanceData.balance < requiredBalance) 
        return res.status(400).send("Not enough leave")

        // == User ==
        let recipient = (await db.promise().query(/*sql*/`
            select * from users where id=?
        `, [data.recipient_id]))[0]?.[0]

        // if recipient is missing or 
        // the role is neither [admin, hr, manager]
        if (!recipient || recipient.role_id > 3) 
        return res.status(400).send("Invalid recipient")

        // == requester_id ==
        // prepare the requester_id
        // which should be the api caller's id
        data.requester_id = auth.id

        // data.from_date = datefns.format(data.from_date, 'yyyy-MM-dd')
        // data.to_date = datefns.format(data.to_date, 'yyyy-MM-dd')
        // res.json(data)

        // == create request ==
        await db.promise().query(/*sql*/`
            insert into users_leaves_requests
            set ?
        `, [data])

        res.sendStatus(201)
    },

    /**
     * Get all leave requests
    */
    async getAllLeaveRequests(req, res) {
        // auth user info.
        let auth = req.authentication.data

        let [requests] = await db.promise().query(/*sql*/`
            select 
            ulr.*,
            
            l.name as leave_name,

            u1.first_name as requester_first_name, 
            u1.last_name as requester_last_name,
            f1.path as requester_avatar_path,

            u2.first_name as recipient_first_name, 
            u2.last_name as recipient_last_name,
            f2.path as recipient_avatar_path,

            u3.first_name as responder_first_name, 
            u3.last_name as responder_last_name,
            f3.path as responder_avatar_path

            from users_leaves_requests as ulr
            left join leaves as l on l.id=ulr.leave_id
            left join users as u1 on u1.id=ulr.requester_id
            left join files as f1 on u1.avatar_id=f1.id
            left join users as u2 on u2.id=ulr.recipient_id
            left join files as f2 on u2.avatar_id=f2.id
            left join users as u3 on u3.id=ulr.responder_id
            left join files as f3 on u3.avatar_id=f3.id

            order by ulr.responded_at desc, ulr.requested_at desc
            -- where ulr.status='pending'
        `)

        res.json(requests)
    },

    /**
     * Get my submitted leave requests
     */
    async getMyLeaveRequests(req, res) {
        // auth user info.
        let auth = req.authentication.data

        let [requests] = await db.promise().query(/*sql*/`
            select 
            ulr.*,

            l.name as leave_name,
            
            u1.first_name as requester_first_name, 
            u1.last_name as requester_last_name,
            f1.path as requester_avatar_path,

            u2.first_name as recipient_first_name, 
            u2.last_name as recipient_last_name,
            f2.path as recipient_avatar_path,

            u3.first_name as responder_first_name, 
            u3.last_name as responder_last_name,
            f3.path as responder_avatar_path

            from users_leaves_requests as ulr
            left join leaves as l on l.id=ulr.leave_id
            left join users as u1 on u1.id=ulr.requester_id
            left join files as f1 on u1.avatar_id=f1.id
            left join users as u2 on u2.id=ulr.recipient_id
            left join files as f2 on u2.avatar_id=f2.id
            left join users as u3 on u3.id=ulr.responder_id
            left join files as f3 on u3.avatar_id=f3.id
            order by ulr.responded_at desc, ulr.requested_at desc
            where ulr.requester_id=?
        `, auth.id)

        res.json(requests)
    },

    async requestDetail(req, res) {
        let { id } = req.params

        let [requests] = await db.promise().query(/*sql*/`
            select 
            ulr.*,
            u1.first_name as requester_first_name, 
            u1.last_name as requester_last_name,
            f1.path as requester_avatar_path,

            u2.first_name as recipient_first_name, 
            u2.last_name as recipient_last_name,
            f2.path as recipient_avatar_path,

            u3.first_name as responder_first_name, 
            u3.last_name as responder_last_name,
            f3.path as responder_avatar_path

            from users_leaves_requests as ulr
            left join users as u1 on u1.id=ulr.requester_id
            left join files as f1 on u1.avatar_id=f1.id
            left join users as u2 on u2.id=ulr.recipient_id
            left join files as f2 on u2.avatar_id=f2.id
            left join users as u3 on u3.id=ulr.responder_id
            left join files as f3 on u3.avatar_id=f3.id
            where ulr.id=?
        `, id)
        if (!requests[0]) res.status(404).send("Not request found")
        else res.json(requests[0])
    },

    async response(req, res) {
        // auth user info.
        let auth = req.authentication.data

        let { id } = req.params

        let data = {}
        // return res.json(req.body)
        try {
            data = z.object({
                status: z.enum(['approved', 'rejected']),
                response_msg: z.string().optional()
            }).parse(req.body)
        } catch(error) { return res.zod.sendError(error) }

        // get leave request detail
        let leaveRequest = (await db.promise().query(/*sql*/`
            select * from users_leaves_requests
            where id=?
        `, id))[0]?.[0]

        // if no such leave request exists, end with error
        if (!leaveRequest) return res.status(404).send("Not such leave request")
        
        // fill up responder_id
        data.responder_id = auth.id
        data.responded_at = new Date()

        await db.promise().query(/*sql*/`
            update users_leaves_requests set ? where id=?
        `, [data, id])

        res.sendStatus(201)
    }

}