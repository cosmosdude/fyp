module.exports = {
    "up": /*sql*/`
    create table users_payslips (
        iid int unique auto_increment,
        id varchar(36) not null default (uuid()) primary key,
        user_id varchar(36),
        name varchar(128) not null default "",
        from_date date, to_date date,
        salary int, -- salary at the time this payslip is generated
        tax float, -- absolute tax mmk
        ssb int, -- absolute ssb mmk
        overtime float not null default 0,
        created_at datetime not null default CURRENT_TIMESTAMP(),
        deleted_at datetime,
        acknowledged_at datetime,

        constraint fk_users_payslips_user_id
        foreign key (user_id)
        references users(id)
    )
    `,
    "down": /*sql*/`
    drop table users_payslips
    `
}