module.exports = {
    "up": /*sql*/`
    alter table users
    add report_to varchar(36) default NULL
    `,
    "down": /*sql*/`
    alter table users 
    drop column report_to
    `
}

