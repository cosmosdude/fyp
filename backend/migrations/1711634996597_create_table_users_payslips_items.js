module.exports = {
    "up": /*sql*/`
    create table payslips_items (
        iid int unique auto_increment,
        id varchar(36) not null default (uuid()) primary key,
        payslip_id varchar(36),
        payroll_item_id varchar(36),

        constraint fk_users_payslips_items_payslip_id
        foreign key (payslip_id)
        references users_payslips(id),

        constraint fk_users_payslips_items_payroll_item_id
        foreign key (payroll_item_id)
        references users_payrolls_items(id)
    )
    `,
    "down": /*sql*/`
    drop table payslips_items
    `
}