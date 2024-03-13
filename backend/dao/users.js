const db = require('../mysql')

const filteredObject = require('../utils/filteredObject')


module.exports = {
    // Get table column informations
    async columns() {
        return await db.promise().query('show columns from users')
    },

    // get all users
    async getAll() {
        return await db.promise().query(
            '\
select u.id as user_id, u.*, DATE_FORMAT(u.dob, "%Y-%m-%d") as dob, \
r.name as role_name, \
f1.path as avatar_path, \
f2.path as employment_agreement_path, \
f2.original_name as employment_agreement_filename, \
dep.name as department_name, \
des.name as designation_name \
from users as u \
left join roles as r on r.id=u.role_id \
left join departments as dep on dep.id=u.department_id \
left join designations as des on des.id=u.designation_id \
left join files as f1 on f1.id=u.avatar_id \
left join files as f2 on f2.id=u.employment_agreement_id \
'
        )
    },

    async getByInsertId(id) {
        return await db.promise()
            .query(
                '\
                select u.id as user_id, u.*, DATE_FORMAT(u.dob, "%Y-%m-%d") as dob, \
                r.name as role_name, \
                f1.path as avatar_path, \
                f2.path as employment_agreement_id, \
                f2.original_name as employment_agreement_filename, \
                dep.name as department_name, \
                des.name as designation_name \
                from users as u \
                left outer join roles as r on r.id=u.role_id \
                left outer join departments as dep on dep.id=u.department_id \
                left outer join designations as des on des.id=u.designation_id \
                left outer join files as f1 on f1.id=u.avatar_id \
                left outer join files as f2 on f2.id=u.employment_agreement_id \
                where u.insertId=?\
                ', 
                [id])
    },

    // get users by id
    async getById(id) {
        let [users] = await db.promise().query(
            '\
            select u.id as user_id, u.*, DATE_FORMAT(u.dob, "%Y-%m-%d") as dob, \
            r.name as role_name, \
            f1.path as avatar_path, \
            f2.path as employment_agreement_path, \
            f2.original_name as employment_agreement_filename, \
            dep.name as department_name, \
            des.name as designation_name \
            from users as u \
            left join roles as r on r.id=u.role_id \
            left join departments as dep on dep.id=u.department_id \
            left join designations as des on des.id=u.designation_id \
            left join files as f1 on f1.id=u.avatar_id \
            left join files as f2 on f2.id=u.employment_agreement_id \
            where u.id=? limit 1', 
            [id]
        )
        return users[0]
    },

    // get users by id
    async getByUsername(username) {
        let [users] = await db.promise().query(
            'select *, DATE_FORMAT(dob, "%Y-%m-%d") as dob from users where username=? limit 1',
            [username]
        )
        return users[0]
    },

    async insert(user) {
        let columnNames = (await this.columns())[0].map(f => f.Field)
        let synatized = filteredObject(user, columnNames)

        return await db.promise().query('insert into users set ?', [synatized])
    },

    // update user having id with new values
    async update(id, user) {
        let columnNames = (await this.columns())[0].map(f => f.Field)
        let synatized = filteredObject(user, columnNames)
        return await db.promise().query('update users set ? where id=?', [synatized, id])
    },

    async delete(id) {
        return await db.promise()
            .query('update users set deleted_at=curdate() where id=?', id)
    }
}