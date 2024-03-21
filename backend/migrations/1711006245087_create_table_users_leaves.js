module.exports = {
    "up": /*sql*/`
    create table users_leaves (
        user_id varchar(36),
        leave_id varchar(36),
        balance float,
        -- foreign key
        constraint fk_users_leaves_user_id
        foreign key (user_id)
        references users(id),

        constraint fk_users_leaves_leave_id
        foreign key (leave_id)
        references leaves(id)
    )
    `,
    "down": /*sql*/`
    drop table users_leaves
    `
}