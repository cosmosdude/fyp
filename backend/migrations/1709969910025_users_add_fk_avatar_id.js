module.exports = {
    "up": /*sql*/`
    ALTER TABLE users add CONSTRAINT fk_users_avatar_id FOREIGN KEY (avatar_id) REFERENCES files(id);
    `,
    "down": /*sql*/`alter table users drop constraint fk_users_avatar_id`
}