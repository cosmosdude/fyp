const z = require('zod')
const db = require('../mysql')

exports.create = async (req, res) => {

    let zResult = z.object({
        name: z.string().min(1),
        initial: z.coerce.number(), 
        max: z.coerce.number(), 
        gender: z.enum(['Male', 'Female', 'Unspecified', '']).optional(),
        halfday: z.coerce.boolean(), 
        carried: z.coerce.boolean(), 
        earnable: z.coerce.boolean()
    }).safeParse(req.body)

    if (!zResult.success) return res.zod.sendError(zResult.error)

    let data = zResult.data

    // Gender was accepted empty string for all genders
    // but db only allows for null
    // so convert it
    if (!data.gender) data.gender = null

    // insert it
    let [insertion] = await db.promise().query(/*sql*/`
        insert into leaves set ?
    `, [zResult.data])

    // get the results
    let [results] = await db.promise().query(/*sql*/`
        select * from leaves where iid=?
    `, [insertion.insertId])

    res.send(results[0])
}