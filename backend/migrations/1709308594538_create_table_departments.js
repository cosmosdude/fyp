module.exports = {
    up: "create table departments (\
            id varchar(36) not null,\
            name varchar(50) not null,\
            primary key (id)\
        )",
    down: "drop table departments"
}