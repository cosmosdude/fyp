module.exports = {
    up: /*sql*/`
    create table report_to(
        employee_id varchar(36) not null,
        manager_id varchar(36) not null,
        constraint fk_report_to_employee_id foreign key (employee_id) references users(id),
        constraint fk_report_to_manager_id foreign key (manager_id) references users(id)
    )`,
    "down": /*sql*/`drop table report_to`
}