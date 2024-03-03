const db = require('../mysql')

const filteredObject = require('../utils/filteredObject')

module.exports = {
    // Get table column informations
    async columns() {
        return await db.promise().query('show columns from users')
    },

    // get all users
    async getAll() {
        return await db.promise().query('select * from users')
    },

    // get users by id
    async getById(id) {
        let [users] = await db.promise().query(
            'select * from users where id=? limit 1',
            [id]
        )
        return users[0]
    },

    async insert(user) {
        let columnNames = (await this.columns())[0].map(f => f.Field)
        let purified = filteredObject(user, columnNames)
        
        return await db.promise().query('insert into users set ?', [purified])
    }
}