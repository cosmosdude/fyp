module.exports = {
    "up": 'create table files(\
        id int not null auto_increment primary key,\
        originalName varchar(255) not null default "",\
        name varchar(36) not null,\
        extension varchar(16) not null default "",\
        path varchar(512),\
        mime varchar(32) not null default "",\
        size int not null default 0\
    )',
    "down": "drop table files"
}