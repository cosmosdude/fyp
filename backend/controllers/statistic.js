
const db = require('../mysql')

exports.departments = async (req, res) => {

    let [results] = await db.promise().query(
        `
        select departments.name as "name", COUNT(users.department_id) as "value"
        from users
        join departments on departments.id=users.department_id
        group by departments.id

        union all

        select "No Department" as "name", count(users.id) as "value"
        from users 
        where department_id is null
        `
    )
    console.log(results)
    res.json(results)
    // res.status(200).json([
    //     { name: "Marketing", value: 3, },
    //     { name: "Software Development", value: 5, },
    //     { name: "Management", value: 1, }
    // ])
}