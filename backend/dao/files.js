const db = require('../mysql')

const filteredObject = require('../utils/filteredObject')

module.exports = {
    // Get table column informations
    async columns() {
        return await db.promise().query('show columns from files')
    },

    async getByInsertId(id) {
        return await db.promise()
            .query('select * from files where id=?', [id])
    },

    async insert(file) {
        let columnNames = (await this.columns())[0].map(f => f.Field)
        let synatized = filteredObject(file, columnNames)

        return await db.promise().query('insert into files set ?', [synatized])
    }
}