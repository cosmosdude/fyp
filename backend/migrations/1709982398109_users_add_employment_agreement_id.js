module.exports = {
    "up": "alter table users add employment_agreement_id int;",
    "down": "alter table users drop column employment_agreement_id"
}