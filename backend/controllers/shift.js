const db = require('../mysql');
const {randomUUID: uuid} = require('crypto');
//const {format} = require('date-fns');
const z = require('zod')

exports.getAll = async (req, res, next) => {
    let [shifts] = await db.promise().query(/*sql*/`
        select 
            u.id as user_id,
            u.first_name, u.last_name,
            dep.name as department_name,
            ds.name as designation_name,
            us1.start_at as sun_start_at, us1.end_at as sun_end_at,
            us2.start_at as mon_start_at, us2.end_at as mon_end_at,
            us3.start_at as tue_start_at, us3.end_at as tue_end_at,
            us4.start_at as wed_start_at, us4.end_at as wed_end_at,
            us5.start_at as thu_start_at, us5.end_at as thu_end_at,
            us6.start_at as fri_start_at, us6.end_at as fri_end_at,
            us7.start_at as sat_start_at, us7.end_at as sat_end_at,
            f.path as avatar_path
        from users as u
        left join departments as dep on dep.id=u.department_id
        left join designations as ds on ds.id=u.designation_id
        left join (
            select * from users_shifts where day='sun'
        ) as us1 on us1.user_id=u.id
        left join (
            select * from users_shifts where day='mon'
        ) as us2 on us2.user_id=u.id
        left join (
            select * from users_shifts where day='tue'
        ) as us3 on us3.user_id=u.id
        left join (
            select * from users_shifts where day='wed'
        ) as us4 on us4.user_id=u.id
        left join (
            select * from users_shifts where day='thu'
        ) as us5 on us5.user_id=u.id
        left join (
            select * from users_shifts where day='fri'
        ) as us6 on us6.user_id=u.id
        left join (
            select * from users_shifts where day='sat'
        ) as us7 on us7.user_id=u.id
        left join files as f on u.avatar_id=f.id
        order by u.first_name asc
        -- select 
        --     us.*, 
        --     u.first_name, u.last_name, 
        --     u.avatar_path 
        -- from users_shifts as us
        -- left join (
        --     select u.*, f.path as avatar_path from users as u
        --     left join files as f on u.avatar_id=f.id
        -- ) as u on us.user_id=u.id
        -- order by u.first_name asc, us.day asc
    `)
    res.json(shifts)
    // res.send("getAll")
}

exports.getUserShifts = async (req, res, next) => {
    let auth = req.authUser
    let { id } = req.params

    if (id === 'me') id = auth.id

    let [shifts] = await db.promise().query(/*sql*/`
        select us.* 
        from users_shifts as us
        where us.user_id=?
        order by us.day asc
    `, [id])
    res.json(shifts)
    res.send("getMyShifts")
}

exports.updateShift = async (req, res, next) => {

    let data = {}
    try {
        let timeRegex = /^(([0]?[1-9])|([1][0-2])):()$/

        data = z.object({
            user_id: z.string().min(1),
            day: z.enum(['sun', 'mon', 'tue', 'wed', 'thu', 'fri','sat']),
            start_at: z.string(),
            end_at: z.string(),
            break_seconds: z.coerce.number(),
        }).parse(req.body)
    } catch(error) { res.zod.sendError(error) }

    if (!data.start_at || !data.end_at) {
        data.start_at = null
        data.end_at = null
    }

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