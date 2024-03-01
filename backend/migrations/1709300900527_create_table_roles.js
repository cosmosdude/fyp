module.exports = {
    // insert
    "up": "\
create table roles (\
    id varchar(36) not null,\
    name varchar(16) not null,\
    description varchar(50),\
    primary key(id)\
);\
    ",
    "down": "DROP table roles" // drop created table
}