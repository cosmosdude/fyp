module.exports = {
    "up": /*sql*/`
    create table users_overtimes_requests (
        iid int unique auto_increment,
        id varchar(36) not null default (uuid()) primary key,

        requester_id varchar(36),
        recipient_id varchar(36),
        responder_id varchar(36),
        request_msg text,
        response_msg text,
        status enum('pending', 'approved', 'rejected') not null default 'pending',
        requested_at datetime not null default (CURRENT_TIMESTAMP()),
        responded_at datetime,

        date date not null,
        duration_sec int(32) not null default 0, 

        -- foreign keys
        constraint fk_users_overtimes_requests_requester_id
        foreign key (requester_id)
        references users(id),

        constraint fk_users_overtimes_requests_recipient_id
        foreign key (recipient_id)
        references users(id),

        constraint fk_users_overtimes_requests_responder_id
        foreign key (responder_id)
        references users(id)
    )
    `,
    "down": /*sql*/`drop table users_overtimes_requests`
}