const db = require('../mysql')

const filteredObject = require('../utils/filteredObject')

module.exports = {
    // Get table column informations
    async columns() {
        return await db.promise().query('show columns from users')
    },

    // get all users
    async getAll() {
        return await db.promise().query('select *, DATE_FORMAT(dob, "%Y-%m-%d") as dob from users')
    },

    // get users by id
    async getById(id) {
        let [users] = await db.promise().query(
            'select *, DATE_FORMAT(dob, "%Y-%m-%d") as dob from users where id=? limit 1',
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