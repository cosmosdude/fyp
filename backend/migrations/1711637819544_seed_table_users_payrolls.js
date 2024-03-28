module.exports = {
    "up": /*sql*/`
    insert into users_payrolls (user_id, salary, wage, overtime_rate, tax_rate)
    select 
        id as user_id,
        174000 as salary,
        5800 as wage,
        2.0 as overtime_rate,
        0.0 as tax_rate
        from users as u
    on duplicate key update user_id=u.id;
    -- seed user payroll datas.
    `,
    "down": /*sql*/`
    delete from users_payrolls -- delete everything
    `
}