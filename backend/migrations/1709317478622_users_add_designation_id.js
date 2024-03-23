module.exports = {
    "up": /*sql*/`alter table users add designation_id varchar(255) default null;`,
    "down": /*sql*/`alter table users drop column designation_id`
}