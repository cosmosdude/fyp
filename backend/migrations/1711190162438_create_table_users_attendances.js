module.exports = {
    "up": /*sql*/`
    create table users_attendances (
        iid int unique auto_increment,
        id varchar(36) not null default (uuid()) primary key,

        user_id varchar(36) not null,
        date date not null,
        start_at time not null,
        end_at time not null,
        checkin_at time,
        checkout_at time,
        break_seconds int,

        constraint fk_users_attendances_user_id
        foreign key (user_id)
        references users(id)
    )
    `,
    "down": /*sql*/`
        drop table users_attendances
    `
}