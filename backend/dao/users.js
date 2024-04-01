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
            /*sql*/`
            select u.id as user_id, u.*, DATE_FORMAT(u.dob, "%Y-%m-%d") as dob,
            r.name as role_name,
            f1.path as avatar_path,
            f2.path as employment_agreement_path,
            f2.original_name as employment_agreement_filename,
            dep.name as department_name,
            des.name as designation_name
            from users as u
            left join roles as r on r.id=u.role_id
            left join departments as dep on dep.id=u.department_id
            left join designations as des on des.id=u.designation_id
            left join files as f1 on f1.id=u.avatar_id
            left join files as f2 on f2.id=u.employment_agreement_id
            order by u.first_name
`
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
        let [users] = await db.promise().query(/*sql*/`
                select u.id as user_id, u.*, DATE_FORMAT(u.dob, "%Y-%m-%d") as dob,
                r.name as role_name,
                f1.path as avatar_path,
                f2.path as employment_agreement_path,
                f2.original_name as employment_agreement_filename,
                dep.name as department_name,
                des.name as designation_name,
                u2.*
                from users as u
                left join roles as r on r.id=u.role_id
                left join departments as dep on dep.id=u.department_id
                left join designations as des on des.id=u.designation_id
                left join files as f1 on f1.id=u.avatar_id
                left join files as f2 on f2.id=u.employment_agreement_id
                left join (
                    select 
                    u.id as report_to_id,
                    u.first_name as report_to_first_name, 
                    u.last_name as report_to_last_name,
                    f.path as report_to_avatar_path
                    from users as u
                    left join files as f on f.id=u.avatar_id
                ) as u2 on u.report_to=u2.report_to_id
                where u.id=? limit 1
            `, [id]
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
    },

    /**
     * Create shifts for given user 
     */
    async createShifts(userId) {
        return await db.promise().query(/*sql*/`
            insert into users_shifts (user_id, day, start_at, end_at, break_seconds)
            select * from (
                select users.id as user_id, shifts.* from users
                cross join (
                    select 'sun' as 'day', null as start_at, null as end_at, 0 as break_seconds union all
                    select 'mon' as 'day', '06:00:00' as start_at, '18:00:00' as end_at, 3600 as break_seconds union all
                    select 'tue' as 'day', '06:00:00' as start_at, '18:00:00' as end_at, 3600 as break_seconds union all
                    select 'wed' as 'day', '06:00:00' as start_at, '18:00:00' as end_at, 3600 as break_seconds union all
                    select 'thu' as 'day', '06:00:00' as start_at, '18:00:00' as end_at, 3600 as break_seconds union all
                    select 'fri' as 'day', '06:00:00' as start_at, '18:00:00' as end_at, 3600 as break_seconds union all
                    select 'sat' as 'day', null as start_at, null as end_at, 0 as break_seconds
                ) as shifts
                where users.id=?
            ) as shifts
        `, [userId])
    },

    async createUserLeaveBalances(userId) {
        return await db.promise().query(/*sql*/`
            insert into users_leaves select 
            (?) as user_id,
            id as leave_id, 
            initial as balance 
            from leaves
        `, [userId])
    }
}