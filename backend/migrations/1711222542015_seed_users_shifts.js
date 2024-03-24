module.exports = {
    "up": /*sql*/`
        insert into users_shifts 
        select 
            u.id as 'user_id', 
            days.day as 'day', 
            null as 'start_at',
            null as 'end_at', 
            0 as break_seconds
        from users as u
        cross join (
            select 'sun' as 'day' union all
            select 'mon' as 'day' union all
            select 'tue' as 'day' union all
            select 'wed' as 'day' union all
            select 'thu' as 'day' union all
            select 'fri' as 'day' union all
            select 'sat' as 'day'
        ) as days

    `,
    "down": /*sql*/`
        delete from users_shifts; -- delete all shifts
    `
}