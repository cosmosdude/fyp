module.exports = {
    "up": /*sql*/`
    create table users_attendances_requests (
        iid int unique auto_increment,
        id varchar(36) not null default (uuid()) primary key,
        
        requester_id varchar(36),
        recipient_id varchar(36),
        responder_id varchar(36),
        request_msg text,
        response_msg text,
        status enum('pending', 'approved', 'rejected') default 'pending',
        requested_at datetime default (CURRENT_TIMESTAMP()),
        responded_at datetime,
        
        date date, -- target request attendance date
        time time,
        type enum('checkin', 'checkout'),
        
        -- foreign keys
        constraint fk_users_attendances_requests_requester_id
        foreign key (requester_id)
        references users(id),

        constraint fk_users_attendances_requests_recipient_id
        foreign key (recipient_id)
        references users(id),

        constraint fk_users_attendances_requests_responder_id
        foreign key (responder_id)
        references users(id)
    )
    `,
    "down": ""
}