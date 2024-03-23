module.exports = {
    up: /*sql*/`
    ALTER TABLE users 
    add CONSTRAINT fk_users_role_id 
    FOREIGN KEY (role_id) 
    REFERENCES roles(id);
    `,
    down: /*sql*/`
    ALTER TABLE users DROP FOREIGN KEY fk_users_role_id;
    `
}