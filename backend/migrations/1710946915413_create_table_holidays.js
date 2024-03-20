module.exports = {
    "up": /*sql*/`
create table holidays (
    iid int unique auto_increment,
    id varchar(36) not null default (uuid()) primary key,
    name varchar(50) not null,
    date DATE,
    deleted_at DATE default NULL
)
    `,

    "down": /*sql*/`
    drop table holidays
    `
}