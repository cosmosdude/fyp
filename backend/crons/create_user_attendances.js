const db = require('../mysql')
const { format } = require('../utils/datefns-fast-wrapper')

let count = 0
module.exports = async () => {
    console.log("Call Count", count++)
    // days of current month
    let days = monthDatesOfCurrentDate()

    // get all users
    let [users] = await db.promise().query(/*sql*/`
        select * from users
    `)

    // for each users
    for (const day of days) {
        
        let date = format(day, 'yyyy-MM-dd')
        let dayOfWeek = format(day, 'EE').toLowerCase()

        for (const user of users) {

            // get the schedule of the user for given day
            let schedule = (await db.promise().query(/*sql*/`
                select * from users_shifts
                where user_id=? and day=?
            `, [user.id, dayOfWeek]))[0]?.[0]

            if (!schedule) break

            let insertData = {
                user_id: user.id,
                date: date,
                start_at: schedule.start_at,
                end_at: schedule.end_at,
                break_seconds: schedule.break_seconds,
            }
            await db.promise().query(/*sql*/`
                insert into users_attendances
                set ? on duplicate key update ?
            `, [insertData, insertData])
        }
    }
    
}

function monthDatesOfCurrentDate() {
    return monthDatesOf(new Date())
}

function monthDatesOf(day) {
    if (!day) return []
    if (isNaN(day)) return []

    day = new Date(day.getTime())
    day.setDate(1)
    let month = day.getMonth()

    let days = []
    while(day.getMonth() === month) {
        days.push(day)
        day = new Date(day.getTime())
        day.setDate(day.getDate() + 1)
    }

    return days
}