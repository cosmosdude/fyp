module.exports = {
    "up": "\
    ALTER TABLE users add CONSTRAINT fk_users_avatar_id FOREIGN KEY (avatar_id) REFERENCES files(id);\
    ",
    "down": "alter table users drop constraint fk_users_avatar_id"
}