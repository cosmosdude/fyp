const db = require('../mysql');
const {randomUUID: uuid} = require('crypto');
//const {format} = require('date-fns');
const z = require('zod');

exports.getAll = async (req, res, next) => {
    let [results] = await db.promise().query(/*sql*/`
    select 
        up.user_id, up.salary, up.wage, up.overtime_rate, up.tax_rate,
        u.first_name, u.last_name,
        dp.name as department_name,
        ds.name as designation_name,
        f.path as avatar_path
    from users_payrolls as up
    join users as u on u.id=up.user_id
    left join departments as dp on dp.id=u.department_id
    left join designations as ds on ds.id=u.designation_id
    left join files as f on u.avatar_id=f.id
    `)

    res.json(results)
}

exports.get = async (req, res, next) => {
    let auth = req.authUser

    let { userId } = req.params
    if (!userId || userId === 'me') userId = auth.id

    let [users] = await db.promise().query(/*sql*/`
        select 
            up.user_id, up.salary, up.wage, up.overtime_rate, up.tax_rate,
            u.first_name, u.last_name,
            dp.name as department_name,
            ds.name as designation_name,
            f.path as avatar_path
        from users_payrolls as up
        join users as u on u.id=up.user_id
        left join departments as dp on dp.id=u.department_id
        left join designations as ds on ds.id=u.designation_id
        left join files as f on u.avatar_id=f.id
        where u.id=?
    `, [userId])

    res.json(users[0])
}

exports.update = async (req, res, next) => {
    let data = {}
    let { userId } = req.params
    try {
        data = z.object({
            salary: z.coerce.number().optional(),
            wage: z.coerce.number().optional(),
            overtime_rate: z.coerce.number().optional()
        }).parse(req.body)
    } catch (error) { return res.zod.sendError(error) }

    if (!data.salary) {
        let [payroll] = await db.promise().query(/*sql*/`
            select * from users_payrolls
            where user_id=?
        `, [userId])

        if (payroll.length === 0) return res.sendStatus(400)
        data.salary = payroll[0].salary
    }

    let yearly = data.salary * 12

    if (yearly <= 2_000_000) data.tax_rate = 0
    else if (yearly <= 5_000_000) data.tax_rate = 0.05
    else if (yearly <= 10_000_000) data.tax_rate = 0.1
    else if (yearly <= 20_000_000) data.tax_rate = 0.15
    else if (yearly <= 30_000_000) data.tax_rate = 0.2
    else data.tax_rate = 0.25

    let [results] = await db.promise().query(/*sql*/`
        update users_payrolls
        set ? 
        where user_id=?
    `, [data, userId])

    res.json({data, userId, results})
}

exports.getUserPayrollItems = async (req, res, next) => {

    let {userId} = req.params

    let [items] = await db.promise().query(/*sql*/`
    select * from users_payrolls_items
    where user_id=? and deleted_at is NULL
    `, [userId])
    
    res.json(items)
}

exports.addUserPayrollItem = async (req, res, next) => {

    let { userId } = req.params

    let data = {}
    try {
        data = z.object({
            name: z.string(),
            amount: z.coerce.number(),
            relative_amount: z.string(),
            type: z.enum(['allowance', 'deduction'])
        }).parse(req.body)
    } catch (error) { res.zod.sendError(error) }

    data.amount = Math.abs(data.amount)

    if (data.relative_amount === "false") data.relative_amount = false
    else data.relative_amount = Boolean(data.relative_amount)

    data.user_id = userId

    await db.promise().query(/*sql*/`
        insert into users_payrolls_items
        set ?
    `, [data])

    res.send("OK")
}

exports.deleteUserPayrollItem = async (req, res, next) => {
    let { userId, itemId } = req.params

    let [results] = await db.promise().query(/*sql*/`
    update users_payrolls_items
    set deleted_at=CURRENT_TIMESTAMP()
    where id=? and user_id=?
    `, [itemId, userId])

    res.status(202).json(results)
}