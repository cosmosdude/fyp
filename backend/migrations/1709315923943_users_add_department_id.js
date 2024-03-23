module.exports = {
    "up": /*sql*/`alter table users add department_id varchar(255) default null;`,
    "down": /*sql*/`alter table users drop column department_id`
}