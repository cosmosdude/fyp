module.exports = {
    "up": /*sql*/`
    create table leave_requests_attachments (
        leave_request_id varchar(36) not null default (uuid()),
        file_id int,

        CONSTRAINT fk_leave_requests_attachments_leave_request_id 
        FOREIGN KEY (leave_request_id)
        REFERENCES users_leaves_requests(id),

        CONSTRAINT fk_leave_requests_attachments_file_id 
        FOREIGN KEY (file_id)
        REFERENCES files(id)
    )
    `,
    "down": /*sql*/`
    drop table leave_requests_attachments
    `
}