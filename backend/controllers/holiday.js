const { format } = require('date-fns')
const db = require('../mysql')
const z = require('zod')

exports.create = async (req, res) => {

    let zResult = z.object({
        name: z.string().min(1),
        date: z.coerce.date()
    }).safeParse(req.body)

    if (!zResult.success) { 
        return res.zod.sendError(zResult.error)
    }

    let [insertion] = await db.promise().query(/*sql*/`insert into holidays set ?`, zResult.data)
    
    let [results] = await db.promise().query(
        /*sql*/`
        select * from holidays where iid = ?
        `, insertion.insertId
    )
    
    res.json(results?.[0])
}

exports.update = async (req, res) => {
    
    let zResult = z.object({
        name: z.string().min(1).optional(),
        date: z.coerce.date().optional()
    }).safeParse(req.body)

    if (!zResult.success) { 
        return res.zod.sendError(zResult.error)
    }

    let { id } = req.params
    // update the item
    await db.promise().query(/*sql*/`
        update holidays set ? where id=?
    `, [zResult.data, id])

    // get the updated result back
    let [updated] = await db.promise().query(/*sql*/`select * from holidays where id=?`, [id])

    if (!updated?.[0]) return res.sendStatus(404)
    res.json(updated[0])
}

exports.get = async (req, res) => {
    let { id } = req.params

    let [results] = await db.promise().query(/*sql*/`select * from holidays where id = ?`, id)

    if (!results?.[0]) return res.sendStatus(404)

    res.json(results[0])
}

exports.getAll = async (req, res) => {
    
    // let { type, date } = req.query

    let schema = z.object({
        type: z.enum(['past', 'upcoming']).optional(),
        date: z.coerce.date().optional()
    })

    let zResult = schema.safeParse(req.query)
    if (!zResult.success) return res.zod.sendError(zResult.error)

    let {type, date} = zResult.data
    if (!type) type = "upcoming"
    if (!date) date = new Date()

    let results = [];
    if (type === 'past') {
        results = (await db.promise().query(
            /*sql*/`select * from holidays where date<=? order by date desc`, date
        ))[0]
    } else {
        results = (await db.promise().query(
            /*sql*/`select * from holidays where date > ? order by date`, date
        ))[0]
    }
    res.json(results)
    // res.send("Type is " + type + " Date is " + format(date, 'd MMM yyyy'))

}