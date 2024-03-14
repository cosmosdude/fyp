
const db = require('../mysql')

exports.departments = async (req, res) => {

    let [results] = await db.promise().query(
        `
        (select departments.name as "name", COUNT(users.department_id) as "value"
        from departments
        left join users on departments.id=users.department_id
        group by departments.id
        union all
        select "No Department" as "name", count(users.id) as "value"
        from users 
        where department_id is null) 
        order by value
        `
    )
    console.log(results)
    res.json(results)
}

exports.designations = async(req, res) => {
    let [results] = await db.promise().query(
        `
        (select designations.name as "name", COUNT(users.designation_id) as "value"
        from designations
        left join users on designations.id=users.designation_id
        group by designations.id

        union all

        select "Not Assigned" as "name", count(users.id) as "value"
        from users 
        where designation_id is null)
        order by value

        `
    )
    res.json(results)
}