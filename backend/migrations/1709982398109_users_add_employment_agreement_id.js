module.exports = {
    "up": /*sql*/`
    alter table users 
    add employment_agreement_id int;
    `,
    "down": /*sql*/`
    alter table users 
    drop column employment_agreement_id
    `
}