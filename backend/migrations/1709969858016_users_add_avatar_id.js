module.exports = {
    "up": /*sql*/`alter table users add avatar_id int;`,
    "down": /*sql*/`alter table users drop column avatar_id`
}