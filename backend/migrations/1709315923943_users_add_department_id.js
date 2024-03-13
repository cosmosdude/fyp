module.exports = {
    "up": "alter table users add department_id varchar(36) default null;",
    "down": "alter table users drop column department_id"
}