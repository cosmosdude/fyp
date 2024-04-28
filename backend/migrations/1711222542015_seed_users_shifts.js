module.exports = {
    "up": /*sql*/`
        insert into users_shifts (user_id, day, start_at, end_at, break_seconds)
        select * from (
            select users.id as user_id, shifts.* from users
            cross join (
                select 'sun' as 'day', null as start_at, null as end_at, 0 as break_seconds union all
                select 'mon' as 'day', '09:00:00' as start_at, '18:00:00' as end_at, 3600 as break_seconds union all
                select 'tue' as 'day', '09:00:00' as start_at, '18:00:00' as end_at, 3600 as break_seconds union all
                select 'wed' as 'day', '09:00:00' as start_at, '18:00:00' as end_at, 3600 as break_seconds union all
                select 'thu' as 'day', '09:00:00' as start_at, '18:00:00' as end_at, 3600 as break_seconds union all
                select 'fri' as 'day', '09:00:00' as start_at, '18:00:00' as end_at, 3600 as break_seconds union all
                select 'sat' as 'day', null as start_at, null as end_at, 0 as break_seconds
            ) as shifts
        ) as shifts
        on duplicate key update users_shifts.user_id=users_shifts.user_id
    `,
    "down": /*sql*/`
        delete from users_shifts; -- delete all shifts
    `
}