module.exports = {
    "up": "alter table users add designation_id varchar(36) default null;",
    "down": "alter table users drop column designation_id"
}