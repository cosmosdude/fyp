let md5 = require('md5')

module.exports = {
    "up": `insert into users(username, first_name, work_email, password, status, role_id)\
    values ('admin', 'Admin', 'admin@yopmail.com', '${md5('admin123')}', 'active', '1')`,
    "down": "delete from users where username='admin'"
}