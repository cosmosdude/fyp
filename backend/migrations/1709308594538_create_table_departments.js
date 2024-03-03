module.exports = {
    up: "create table departments (\
            insertId int unique auto_increment,\
            id varchar(36) not null default (uuid()),\
            name varchar(50) not null,\
            deleted_at datetime,\
            primary key (id)\
        )",
    down: "drop table departments"
}