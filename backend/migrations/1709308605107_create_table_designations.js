module.exports = {
    "up": /*sql*/`
    create table designations (
        insertId int unique auto_increment,
        id varchar(36) not null default (uuid()),
        name varchar(50) not null, 
        department_id varchar(36) not null,
        deleted_at date,
        primary key (id),
        constraint fk_designations_department_id foreign key (department_id) references departments(id)
    );
    `,
    down: /*sql*/`drop table designations`
}