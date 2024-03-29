const db = require('../mysql');
const {randomUUID: uuid} = require('crypto');
//const {format} = require('date-fns');
const z = require('zod');
const { getMonth } = require('../utils/date');
const { format } = require('date-fns');

exports.getAll = async (req, res, next) => {

    let {month, year} = req.query

    month = String(Number(month)).padStart(2, '0')
    year = String(Number(year)).padStart(4, '0')

    let monthDates = getMonth(new Date(`${year}-${month}-01`))

    if (monthDates.length === 0) return res.json([])

    let [payslips] = await db.promise().query(/*sql*/`
        select 
            u.first_name, u.last_name,
            f.path as avatar_path,
            up.* ,
            u.id as user_id
        from users as u
        left join users_payslips as up 
            on up.user_id=u.id and up.deleted_at is NULL 
            and up.from_date>=? and up.to_date<=?
        left join files as f on u.avatar_id=f.id
        order by u.first_name
    `, [
        format(monthDates[0], 'yyyy-MM-dd'), 
        format(monthDates[monthDates.length - 1], 'yyyy-MM-dd')
    ])

    res.json(payslips)
}

exports.getUserPayslips = async (req, res, next) => {

    let auth = req.authUser
    let {userId} = req.query
    if (!userId) userId = auth.id

    let [payslips] = await db.promise().query(/*sql*/`
        select 
            u.first_name, u.last_name,
            f.path as avatar_path,
            up.* ,
            u.id as user_id
        from users as u
        left join users_payslips as up 
            on up.user_id=u.id and up.deleted_at is NULL 
        left join files as f on u.avatar_id=f.id
        where u.id=?
        order by up.from_date
    `, [userId])

    res.json(payslips)
}

exports.acknowledge = async (req, res, next) => {

    let {id} = req.params
    // return res.json(id)
    await db.promise().query(/*sql*/`
        update users_payslips
        set acknowledged_at=CURRENT_TIMESTAMP()
        where id=?    
    `, [id])

    res.sendStatus(202)
}



exports.generateForUser = async (req, res, next) => {
    let {userId} = req.params

    let {month, year} = req.query

    month = String(Number(month)).padStart(2, '0')
    year = String(Number(year)).padStart(4, '0')

    let monthDates = getMonth(new Date(`${year}-${month}-01`))

    if (monthDates.length === 0) return res.sendStatus(400)

    let from_date = format(monthDates[0], 'yyyy-MM-dd')
    let to_date = format(monthDates[monthDates.length - 1], 'yyyy-MM-dd')

    // get payroll info of user
    let payroll = (await db.promise().query(/*sql*/`
        select * from users_payrolls where user_id=?
    `, [userId]))[0]?.[0]

    if(!payroll) return res.status(400).send("user has no payroll")
    
    // Get active payroll items of the user
    let [items] = await db.promise().query(/*sql*/`
        select * from users_payrolls_items where user_id=? and deleted_at is NULL
    `, [userId])

    let allowances = items.filter(x => x.type === 'allowance')
    // return res.json(allowances)
    let grossIncome = allowances.reduce((p, c) => {
        return p + (!!c.relative_amount ? payroll.salary * c.amount : c.amount)
    }, payroll.salary)

    let deductions = items.filter(x => x.type === 'deduction')
    let grossDeduction = deductions.reduce((p, c) => {
        return p + (!!c.relative_amount ? payroll.salary * c.amount : c.amount)
    }, grossIncome * payroll.tax_rate)

    // Deduction can only be half the total
    grossDeduction = Math.min(grossDeduction, grossIncome / 2)

    let ssb = Math.min(6000, grossIncome * 0.02)

    // Calculated intrim values
    let intrim = {
        grossIncome,
        grossDeduction, 
        tax: payroll.tax_rate,
        ssb
    }

    let [overtimes] = await db.promise().query(/*sql*/`
        select SUM(duration_sec) as total from users_overtimes_requests
        where status="approved" and requester_id=? and date>=? and date<=?
    `, [userId, from_date, to_date])

    let totalOvertimeSec = Number(overtimes[0]?.total ?? 0)

    let overtimeHrs = totalOvertimeSec / 3600

    let hourlyRate = payroll.wage / 8
    let overtimePayout = overtimeHrs * hourlyRate * payroll.overtime_rate
    // return res.json({overtimeHrs, hourlyRate, overtimePayout})

    // return res.json(intrim)

    let data = {
        user_id: userId,
        name: `${format(monthDates[0], 'MMMM yyyy')} Payslip`,
        from_date, to_date,
        salary: payroll.salary,
        tax: intrim.tax,
        ssb: intrim.ssb,
        overtime: overtimePayout
    }

    // delete existing payslip
    await db.promise().query(/*sql*/`
        update users_payslips set deleted_at=CURRENT_TIMESTAMP()
        where user_id=? and from_date=? and to_date=? and deleted_at is NULL
    `, [userId, from_date, to_date])

    // insert new payslip
    let [payslipInsertion] = await db.promise().query(/*sql*/`
    insert into users_payslips set ?
    `, [data])

    // get last inserted payslip
    let payslip = (await db.promise().query(/*sql*/`
        select 
            up.*,
            u.first_name, u.last_name,
            f.path as avatar_path
        from users_payslips as up 
        join users as u on u.id=up.user_id
        left join files as f on u.avatar_id=f.id
        where up.iid=?
    `, [payslipInsertion.insertId]))[0]?.[0]

    items.forEach(item => {
        db.promise().query(/*sql*/`
            insert into payslips_items
            set payslip_id=?, payroll_item_id=?
        `, [payslip.id, item.id])
    })

    res.json(payslip)
}

exports.payslipDetail = async (req, res, next) => {
    let {id} = req.params
    
    let payslip = (await db.promise().query(/*sql*/`
        select 
            up.*,
            u.first_name, u.last_name,
            f.path as avatar_path
        from users_payslips as up 
        join users as u on u.id=up.user_id
        left join files as f on u.avatar_id=f.id
        where up.id=?
    `, id))[0]?.[0]

    if (!payslip) return res.status(400).send(payslip)

    let [items] = await db.promise().query(/*sql*/`
    select 
        pi.*,
        upi.name, upi.amount,
        upi.relative_amount, upi.type
    from payslips_items as pi
    join users_payrolls_items as upi on upi.id=pi.payroll_item_id
    where payslip_id=?
    `, payslip.id)

    return res.json({detail: payslip, items})
}