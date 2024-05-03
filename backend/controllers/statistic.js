const { format } = require('date-fns')
const db = require('../mysql')
const { getMonth } = require('../utils/date')
const { z } = require('zod')

exports.departments = async (req, res) => {

    let [results] = await db.promise().query(
        /*sql*/`
        select 
            Count(IFNULL(d.id, "#null")) as "value", 
            IFNULL(d.name, "No Department") as "name"
        from users as u
        left join departments as d 
            on d.id=u.department_id 
            and d.deleted_at is null
        group by d.id
        order by value
        `
    )
    // results = results.map(x => {
    //     x.name = x.name ?? "Unassigned"
    //     return x
    // })
    console.log(results)
    res.json(results)
}

exports.designations = async(req, res) => {
    let [results] = await db.promise().query(
        /*sql*/`
        select 
            Count(IFNULL(d.id, "#null")) as "value",
            IFNULL(d.name, "Unassigned") as "name"
        from users as u
        left join designations as d 
            on u.designation_id=d.id
            and d.deleted_at is null
        group by d.id
        `
    )
    res.json(results)
}

exports.leaveTrends = async (req, res) => {

    let { year } = req.query
    try {
        year = z.coerce.number().optional().parse(year)
    } catch (error) { return res.zod.sendError(error) }
    
    if (!year) year = new Date().getFullYear()

    let date = new Date(`${year}-01-01`)
    year = date.getFullYear()
    let datas = []
    // for all months
    for (let m = 0; m < 12; m++) {
        let yyyy = year
        let mm = (m + 1).toString().padStart(2, '0')
        let startOfMonth = new Date(`${yyyy}-${mm}-01`)

        let days = getMonth(startOfMonth)
        let first = days[0]
        let last = days[days.length - 1]
        // dates.push(startOfMonth)

        let [leaveTrend] = await db.promise().query(/*sql*/`
            select l.id, l.name, SUM(l.count) as count from 
            (select 
                l.id, l.name, count(l.id) as count
            from users_leaves_requests as ulr
            join leaves as l on l.id=ulr.leave_id and l.deleted_at is null
            where status='approved' and from_date>=? and from_date<=?
            group by l.id, l.name 

            union all

            select 
                l.id, l.name, 0 as count
                from leaves as l where l.deleted_at is NULL
            ) as l 
            
            group by l.id
            order by l.name asc
        `, [format(first, 'yyyy-MM-dd'), format(last, 'yyyy-MM-dd')])

        let data = {
            month: format(startOfMonth, 'MMMM'),
            first: format(first, 'yyyy-MM-dd'), last: format(last, 'yyyy-MM-dd'),
            trend: leaveTrend
        }

        datas.push(data)
    }
    res.json(datas)
}

exports.absentRate = async (req, res) => {

    let { year } = req.query
    try {
        year = z.coerce.number().optional().parse(year)
    } catch (error) { return res.zod.sendError(error) }
    
    if (!year) year = new Date().getFullYear()

    let date = new Date(`${year}-01-01`)
    year = date.getFullYear()
    let datas = []
    // for all months
    for (let m = 0; m < 12; m++) {
        let yyyy = year
        let mm = (m + 1).toString().padStart(2, '0')
        let startOfMonth = new Date(`${yyyy}-${mm}-01`)

        let days = getMonth(startOfMonth)
        let first = days[0]
        let last = days[days.length - 1]
        // dates.push(startOfMonth)

        // let [leaveTrend] = await db.promise().query(/*sql*/`
        //     select l.id, l.name, SUM(l.count) as count from 
        //     (select 
        //         l.id, l.name, count(l.id) as count
        //     from users_leaves_requests as ulr
        //     join leaves as l on l.id=ulr.leave_id
        //     where status='approved' and from_date>=? and from_date<=?
        //     group by l.id, l.name 

        //     union all

        //     select 
        //         l.id, l.name, 0 as count
        //     from leaves as l
        //     ) as l 
        //     group by l.id
        //     order by l.name asc
        // `, [format(first, 'yyyy-MM-dd'), format(last, 'yyyy-MM-dd')])

        let workingDays = (await db.promise().query(/*sql*/`
            select COUNT(*) as count from (select 
                ua.user_id, ua.date, 
                ua.start_at, ua.end_at, 
                ua.checkin_at, ua.checkout_at, 
                leaves.id, leaves.name
            from users_attendances as ua
            left join users_leaves_requests as ulr on ulr.from_date>=ua.date and ulr.to_date<=ua.date
            left join leaves on leaves.id=ulr.leave_id and ua.user_id = ulr.requester_id
            where 
                ua.date>=? and 
                ua.date<=? and 
            --    ua.user_id='8cd08bee-e1b5-11ee-a617-52db3199040b' and
                ua.start_at is not null and
                ua.end_at is not null and
                leaves.id is null
            ) as t;
        `, [format(first, 'yyyy-MM-dd'), format(last, 'yyyy-MM-dd')]))[0]?.[0].count ?? 0

        let absentDays = (await db.promise().query(/*sql*/`
            select COUNT(*) as count from (select 
                ua.user_id, ua.date, 
                ua.start_at, ua.end_at, 
                ua.checkin_at, ua.checkout_at, 
                leaves.id, leaves.name
            from users_attendances as ua
            left join users_leaves_requests as ulr on ulr.from_date>=ua.date and ulr.to_date<=ua.date
            left join leaves on leaves.id=ulr.leave_id and ua.user_id = ulr.requester_id
            where 
                ua.date>=? and 
                ua.date<=? and 
            --    ua.user_id='8cd08bee-e1b5-11ee-a617-52db3199040b' and
                ua.start_at is not null and
                ua.end_at is not null and
                ua.checkin_at is null and
                leaves.id is null
            ) as t;
        `, [format(first, 'yyyy-MM-dd'), format(last, 'yyyy-MM-dd')]))[0]?.[0].count ?? 0

        let data = {
            month: format(startOfMonth, 'MMMM'),
            first: format(first, 'yyyy-MM-dd'), last: format(last, 'yyyy-MM-dd'),
            //trend: leaveTrend
            workingDays,
            absentDays
        }

        datas.push(data)
    }
    res.json(datas)
}