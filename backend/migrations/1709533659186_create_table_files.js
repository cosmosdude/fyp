module.exports = {
    "up": /*sql*/`
    create table files(
        id int auto_increment primary key,
        original_name varchar(255) not null default "",
        name varchar(36) not null default "",
        extension varchar(16) not null default "",
        path varchar(512) default "",
        mime varchar(255) not null default "",
        size int not null default 0,
        deleted_at date
    )`,
    "down": /*sql*/`drop table files`
}