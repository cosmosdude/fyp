const db = require('../mysql');
const {randomUUID: uuid} = require('crypto');
//const {format} = require('date-fns');
const z = require('zod')

exports.getAll = async (req, res, next) => {
    let [shifts] = await db.promise().query(/*sql*/`
        select 
            us.*, 
            u.first_name, u.last_name, 
            u.avatar_path 
        from users_shifts as us
        left join (
            select u.*, f.path as avatar_path from users as u
            left join files as f on u.avatar_id=f.id
        ) as u on us.user_id=u.id
        order by u.first_name asc, us.day asc
    `)
    res.json(shifts)
    // res.send("getAll")
}

exports.getMyShifts = async (req, res, next) => {
    let auth = req.authUser
    let [shifts] = await db.promise().query(/*sql*/`
        select us.* 
        from users_shifts as us
        where us.user_id=?
        order by us.day asc
    `, [auth.id])
    res.json(shifts)
    res.send("getMyShifts")
}

exports.updateShift = async (req, res, next) => {

    let data = {}
    try {
        let timeRegex = /^(([0]?[1-9])|([1][0-2])):()$/

        data = z.object({
            user_id: z.string().min(1),
            day: z.enum(['sun', 'mon', 'tue', 'wed', 'thu', 'fri',' sat']),
            start_at: z.string(),
            end_at: z.string(),
            break_seconds: z.coerce.number(),
        }).parse(req.body)
    } catch(error) { res.zod.sendError(error) }

    await db.promise().query(/*sql*/`
        update users_shifts
        set ?
        where user_id=? and day=?
    `, [data, data.user_id, data.day])

    let [results] = await db.promise().query(/*sql*/`
        select * from users_shifts
        where user_id=? and day=?
    `, [data.user_id, data.day])

    res.json(results)
}