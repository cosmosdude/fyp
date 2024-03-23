module.exports = {
    "up": /*sql*/`
        alter table users_notifications
        add attendance_request_id varchar(36)
    `,
    "down": /*sql*/`
    alter table users_notifications drop column attendance_request_id
    `
}