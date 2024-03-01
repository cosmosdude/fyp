module.exports = {
    "up": "alter table users add department_id varchar(36);",
    "down": "alter table users drop column department_id"
}