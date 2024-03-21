module.exports = {
    "up": /*sql*/`
    create table leaves (
        iid int unique auto_increment,
        id varchar(36) not null default (uuid()) primary key,
        name varchar(64) not null,
        initial float default 0,
        max int default 0,
        gender ENUM('Male', 'Female', 'Unspecified') default NULL,
        halfday boolean not null default false,
        carried boolean not null default false,
        earnable boolean not null default false,
        enabled boolean not null default true,
        deleted_at timestamp
    )
    `,
    "down": /*sql*/`
    drop table leaves
    `
}