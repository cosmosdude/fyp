module.exports = {
    "up": /*sql*/`
        ALTER TABLE users_notifications 
        add CONSTRAINT fk_users_notifications_attendance_request_id 
        FOREIGN KEY (attendance_request_id) 
        REFERENCES users_attendances_requests(id); 
    `,
    "down": /*sql*/`
        alter table users_notifications
        drop foreign key fk_users_notifications_attendance_request_id
    `
}