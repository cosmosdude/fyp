module.exports = {
    "up": "\
    ALTER TABLE users add CONSTRAINT fk_users_department_id FOREIGN KEY (department_id) REFERENCES departments(id);\
    ",
    "down": "alter table users drop constraint fk_users_department_id"
}