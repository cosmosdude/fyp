module.exports = {
    "up": /*sql*/`
    create table users_leaves_requests (
        iid int unique auto_increment,
        id varchar(36) not null default (uuid()) primary key,
        from_date date,
        to_date date,
        requester_id varchar(36),
        recipient_id varchar(36),
        responder_id varchar(36),
        request_msg text,
        response_msg text,
        status enum('pending', 'approved', 'rejected') default 'pending',
        requested_at datetime default (CURRENT_TIMESTAMP()),
        responded_at datetime,
        outstanding_balance float,
        leave_id varchar(36),
        halfday enum('am', 'pm') default null,
        -- foreign keys
        constraint fk_users_leaves_requests_requester_id
        foreign key (requester_id)
        references users(id),

        constraint fk_users_leaves_requests_recipient_id
        foreign key (recipient_id)
        references users(id),

        constraint fk_users_leaves_requests_responder_id
        foreign key (responder_id)
        references users(id),

        constraint fk_users_leaves_requests_leave_id
        foreign key (leave_id)
        references leaves(id)
    )
    `,
    "down": /*sql*/`
    drop table users_leaves_requests
    `
}