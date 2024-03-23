module.exports = {
    "up": /*sql*/`
    create table users_notifications (
        iid int unique auto_increment,
        id varchar(36) not null default (uuid()) primary key,
        title text,
        body text,
        created_at datetime not null default(CURRENT_TIMESTAMP()),
        user_id varchar(36),
        read_at datetime,

        type varchar(64),
        leave_request_id varchar(36),

        constraint fk_users_notifications_user_id
        foreign key (user_id)
        references users(id),

        constraint fk_users_notifications_leave_request_id
        foreign key (leave_request_id)
        references users_leaves_requests(id)
    )
    `,
    "down": /*sql*/`
        drop table users_notifications;
    `
}