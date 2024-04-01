const { format } = require('date-fns')
const db = require('../mysql')
const { getMonth } = require('../utils/date')
const { z } = require('zod')

exports.departments = async (req, res) => {

    let [results] = await db.promise().query(
        /*sql*/`
        (select departments.name as "name", COUNT(users.department_id) as "value"
        from departments
        left join users on departments.id=users.department_id
        group by departments.id
        union all
        select "No Department" as "name", count(users.id) as "value"
        from users 
        where department_id is null) 
        order by value
        `
    )
    console.log(results)
    res.json(results)
}

exports.designations = async(req, res) => {
    let [results] = await db.promise().query(
        /*sql*/`
        (select designations.name as "name", COUNT(users.designation_id) as "value"
        from designations
        left join users on designations.id=users.designation_id
        group by designations.id

        union all

        select "Not Assigned" as "name", count(users.id) as "value"
        from users 
        where designation_id is null)
        order by value

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
            join leaves as l on l.id=ulr.leave_id
            where status='approved' and from_date>=? and from_date<=?
            group by l.id, l.name 

            union all

            select 
                l.id, l.name, 0 as count
            from leaves as l
            ) as l 
            group by l.id
            order by l.name asc
        `, [format(first, 'yyyy-MM-dd'), format(last, 'yyyy-MM-dd')])

        let data = {
            month: format(startOfMonth, 'MMM'),
            first: format(first, 'yyyy-MM-dd'), last: format(last, 'yyyy-MM-dd'),
            trend: leaveTrend
        }

        datas.push(data)
    }

    res.json({
        day: date.getDate(),
        month: date.getMonth(),
        year: date.getFullYear(),
        datas: datas
    })
}