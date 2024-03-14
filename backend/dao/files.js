const db = require('../mysql')

const filteredObject = require('../utils/filteredObject')

module.exports = {
    // Get table column informations
    async columns() {
        return await db.promise().query('show columns from files')
    },

    /** 
     * Get file by given insert id. Same as getById.
     * 
     * @returns Array of file records. One item array if matching record. Zero otherwise.
     * */ 
    async getByInsertId(id) {
        return await db.promise()
            .query('select * from files where id=?', [id])
    },

    /** 
     * Get file by id. Same as getByInsertId.
     * 
     * @returns Array of file records. One item array if matching record. Zero otherwise.
     */
    async getById(id) {
        return this.getByInsertId(id)
    },

    async insert(file) {
        let columnNames = (await this.columns())[0].map(f => f.Field)
        let synatized = filteredObject(file, columnNames)

        return await db.promise().query('insert into files set ?', [synatized])
    },

    // Delete file given by id.
    async deleteById(id) {
        return await db.promise().query(
            'update files set deleted_at=CURDATE() where id=?', [id]
        )
    }

}