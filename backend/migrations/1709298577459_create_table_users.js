module.exports = {
    up: "\
create table users (\
    id varchar(36) not null,\
    first_name varchar(50),\
    last_name varchar(50),\
    username varchar(30) not null,\
    email varchar(50),\
    phone varchar(20),\
    gender varchar(16),\
    work_email varchar(50) not null,\
    work_phone varchar(20),\
    password varchar(36) not null,\
    emergency_name1 varchar(30),\
    emergency_number1 varchar(20),\
    emergency_relation1 varchar(20),\
    emergency_name2 varchar(30),\
    emergency_number2 varchar(20),\
    emergency_relation2 varchar(30),\
    dob date,\
    status varchar(16),\
    role_id varchar(36) not null,\
    PRIMARY KEY (id)\
);\
    ",
    down: "drop table users;"
}