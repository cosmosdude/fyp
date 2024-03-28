module.exports = {
    "up": /*sql*/`
    create table users_payrolls_items (
        iid int unique auto_increment,
        id varchar(36) not null default (uuid()) primary key,
        user_id varchar(36),
        name varchar(128) not null default "",
        amount float not null default 0,
        relative_amount boolean not null default false,
        type enum('allowance', 'deduction') not null,
        deleted_at datetime,

        constraint fk_users_payrolls_items_user_id
        foreign key (user_id)
        references users(id)
    )
    `,
    "down": /*sql*/`
    drop table users_payrolls_items
    `
}