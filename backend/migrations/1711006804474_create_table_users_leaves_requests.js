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
        request text,
        response text,
        status enum('pending', 'approved', 'rejected'),
        requested_at timestamp default (CURRENT_TIMESTAMP()),
        responded_at timestamp,
        outstanding_balance float,
        leave_id varchar(36),
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
        references users(id)
    )
    `,
    "down": /*sql*/`
    drop table users_leaves_requests
    `
}