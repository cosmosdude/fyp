module.exports = {
    up: /*sql*/`
        create table departments (
            insertId int unique auto_increment,
            id varchar(36) not null default (uuid()),
            name varchar(50) not null,
            deleted_at datetime,
            primary key (id)
        )`,
    down: /*sql*/`drop table departments`
}