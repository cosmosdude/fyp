module.exports = {
    "up": /*sql*/`
    ALTER TABLE users add CONSTRAINT fk_users_designation_id FOREIGN KEY (designation_id) REFERENCES designations(id);\
    `,
    "down": /*sql*/`alter table users drop constraint fk_users_designation_id`
}