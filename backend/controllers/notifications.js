const db = require('../mysql')

exports.getAll = async (req, res) => {
    let auth = req.authUser
    let [notifications] = await db.promise().query(/*sql*/`
        select * from users_notifications
        where user_id=?
        order by created_at desc
    `, auth.id)
    res.json(notifications)
}

exports.read = async (req, res) => {
    let { id } = req.params
    db.promise().query(/*sql*/`
        update users_notifications 
        set read_at=CURRENT_TIMESTAMP()
        where id=?
    `, id)
    res.sendStatus(201)
}