module.exports = {
    "up": /*sql*/`
    ALTER TABLE users
    add CONSTRAINT fk_users_employment_agreement_id
    FOREIGN KEY (employment_agreement_id)
    REFERENCES files(id);
    `,
    "down": /*sql*/`
    alter table users
    `
}