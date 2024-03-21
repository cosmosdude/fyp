const z = require('zod')
const db = require('../mysql')

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
        gender: z.enum(['Male', 'Female', 'Unspecified', '']),
        halfday: z.coerce.boolean(), 
        carried: z.coerce.boolean(), 
        earnable: z.coerce.boolean()
    }).safeParse(req.body)

    if (!zResult.success) return res.zod.sendError(zResult.error)

    let data = zResult.data

    // Gender was accepted empty string for all genders
    // but db only allows for null
    // so convert it
    if (!data.gender) data.gender = null

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
        gender: z.enum(['Male', 'Female', 'Unspecified', '']).optional(),
        halfday: z.coerce.boolean().optional(), 
        carried: z.coerce.boolean().optional(), 
        earnable: z.coerce.boolean().optional()
    }).safeParse(req.body)

    let data = zResult.data

    // Gender was accepted empty string for all genders
    // but db only allows for null
    // so convert it
    if (!data.gender) data.gender = null

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
 * Balance related methods
*/
exports.balance = {

    async getAll(req, res) {

        let auth = req.authentication.data
        // res.json(user)
        
        let [balances] = await db.promise().query(/*sql*/`
            select balances 
            from users_leaves as ul
            where ul.user_id=?
        `, [auth.id])

        res.json(balances)
    }

}