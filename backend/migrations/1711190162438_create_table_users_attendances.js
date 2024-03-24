module.exports = {
    "up": /*sql*/`
    create table users_attendances (
        -- iid int unique auto_increment,
        -- id varchar(36) not null default (uuid()) primary key,

        user_id varchar(36) not null,
        date date not null,
        start_at time,
        end_at time,
        checkin_at time,
        checkout_at time,
        break_seconds int,

        primary key (user_id, date),

        constraint fk_users_attendances_user_id
        foreign key (user_id)
        references users(id)
    )
    `,
    "down": /*sql*/`
        drop table users_attendances
    `
}