module.exports = {
    "up": "alter table users add avatar_id int;",
    "down": "alter table users drop column avatar_id"
}