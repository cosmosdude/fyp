module.exports = {
    "up": /*sql*/`
        alter table users_notifications
        add overtime_request_id varchar(36)
    `,
    "down": /*sql*/`
    alter table users_notifications drop column overtime_request_id
    `
}