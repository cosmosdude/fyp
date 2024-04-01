insert into users_shifts 
select 
    u.id as 'user_id', 
    shifts.day as 'day', 
    shifts.start_at as 'start_at',
    shifts.end_at as 'end_at', 
    shifts.break_seconds as break_seconds
from users as u
cross join (
    select 'sun' as 'day', null as start_at, null as end_at, 0 as break_seconds union all
	select 'mon' as 'day', '06:00:00' as start_at, '18:00:00' as end_at, 3600 as break_seconds union all
	select 'tue' as 'day', '06:00:00' as start_at, '18:00:00' as end_at, 3600 as break_seconds union all
	select 'wed' as 'day', '06:00:00' as start_at, '18:00:00' as end_at, 3600 as break_seconds union all
	select 'thu' as 'day', '06:00:00' as start_at, '18:00:00' as end_at, 3600 as break_seconds union all
	select 'fri' as 'day', '06:00:00' as start_at, '18:00:00' as end_at, 3600 as break_seconds union all
	select 'sat' as 'day', null as start_at, null as end_at, 0 as break_seconds
) as shifts
on duplicate key update days.day=days.day

--
(
	select 'sun' as 'day', null as start_at, null as end_at, 0 as break_seconds union all
	select 'mon' as 'day', '06:00:00' as start_at, '18:00:00' as end_at, 3600 as break_seconds union all
	select 'tue' as 'day', '06:00:00' as start_at, '18:00:00' as end_at, 3600 as break_seconds union all
	select 'wed' as 'day', '06:00:00' as start_at, '18:00:00' as end_at, 3600 as break_seconds union all
	select 'thu' as 'day', '06:00:00' as start_at, '18:00:00' as end_at, 3600 as break_seconds union all
	select 'fri' as 'day', '06:00:00' as start_at, '18:00:00' as end_at, 3600 as break_seconds union all
	select 'sat' as 'day', null as start_at, null as end_at, 0 as break_seconds
)

-- 

(select id as user_id from users
cross join (
    select 'sun' as 'day', null as start_at, null as end_at, 0 as break_seconds union all
	select 'mon' as 'day', '06:00:00' as start_at, '18:00:00' as end_at, 3600 as break_seconds union all
	select 'tue' as 'day', '06:00:00' as start_at, '18:00:00' as end_at, 3600 as break_seconds union all
	select 'wed' as 'day', '06:00:00' as start_at, '18:00:00' as end_at, 3600 as break_seconds union all
	select 'thu' as 'day', '06:00:00' as start_at, '18:00:00' as end_at, 3600 as break_seconds union all
	select 'fri' as 'day', '06:00:00' as start_at, '18:00:00' as end_at, 3600 as break_seconds union all
	select 'sat' as 'day', null as start_at, null as end_at, 0 as break_seconds
)
)