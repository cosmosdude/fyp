let md5 = require('md5')

module.exports = {
    "up": `insert into users(id, username, work_email, password, role_id)\
    values ('01', 'admin', 'admin@yopmail.com', '${md5('admin123')}', '1')`,
    "down": "delete from users where id = '01'"
}