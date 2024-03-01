module.exports = {
    "up": "\
insert into roles values (1, 'admin', 'Administrator'),\
(2, 'hr', 'HR Manager'),\
(3, 'manager', 'Line Manager'),\
(4, 'employee', 'Employee')\
",
    "down": "DELETE from roles"
}