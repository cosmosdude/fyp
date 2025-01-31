module.exports = {
    "up": /*sql*/`
    create table users_shifts(
        user_id varchar(36) not null,
        day enum('sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat') not null,
        start_at time, -- assume no shift if start_at is null
        end_at time,
        break_seconds int not null default 0,

        constraint fk_users_shifts_user_id
        foreign key (user_id)
        references users(id),

        primary key (user_id, day)
    )
    `,
    "down": /*sql*/`
    drop table users_shifts
    `
}