module.exports = {
    "up": "\
    ALTER TABLE users add CONSTRAINT fk_users_designation_id FOREIGN KEY (designation_id) REFERENCES designations(id);\
    ",
    "down": "alter table users drop constraint fk_users_designation_id"
}