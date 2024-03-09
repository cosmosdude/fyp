module.exports = {
    "up": "\
    ALTER TABLE users \
    add CONSTRAINT fk_users_employment_agreement_id \
    FOREIGN KEY (employment_agreement_id) \
    REFERENCES files(id);\
    ",
    "down": "\
    alter table users \
    drop constraint fk_users_employment_agreement_id"
}