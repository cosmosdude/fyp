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