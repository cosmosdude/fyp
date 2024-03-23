module.exports = {
    "up": /*sql*/`
        ALTER TABLE users_notifications 
        add CONSTRAINT fk_users_notifications_overtime_request_id 
        FOREIGN KEY (overtime_request_id) 
        REFERENCES users_overtimes_requests(id); 
    `,
    "down": /*sql*/`
        alter table users_notifications
        drop foreign key fk_users_notifications_overtime_request_id
    `
}