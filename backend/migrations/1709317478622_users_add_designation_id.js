module.exports = {
    "up": "alter table users add designation_id varchar(36);",
    "down": "alter table users drop column designation_id"
}