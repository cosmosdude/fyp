module.exports = {
    "up": "create table designations (\
        id varchar(36) not null,\
        name varchar(50) not null, \
        department_id varchar(36) not null,\
        primary key (id),\
        constraint fk_designations_department_id foreign key (department_id) references departments(id)\
    );\
    ",
    down: "drop table designations"
}