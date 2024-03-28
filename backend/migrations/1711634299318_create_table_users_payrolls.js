module.exports = {
    "up": /*sql*/`
    create table users_payrolls (
        -- iid int unique auto_increment,
        -- id varchar(36) not null default (uuid()) primary key,
        user_id varchar(36),
        salary int not null default 0, 
        wage int not null default 0,
        overtime_rate float default 2.0,
        tax_rate float default 0,

        constraint fk_users_payrolls_user_id
        foreign key (user_id)
        references users(id),

        primary key (user_id)
    )
    `,
    "down": /*sql*/`
    drop table users_payrolls
    `
}