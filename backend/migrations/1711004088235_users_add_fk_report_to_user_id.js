module.exports = {
    "up": /*sql*/`
        ALTER TABLE users 
        add CONSTRAINT fk_users_report_to 
        FOREIGN KEY (report_to) 
        REFERENCES users(id); 
    `,
    "down": /*sql*/`
    alter table users drop constraint fk_users_report_to
    `

}