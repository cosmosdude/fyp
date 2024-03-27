const cron = require('node-cron')

exports.schedule = () => {
    schedule("*/5 * * * * *", require('./log_address.cron'), true);
    schedule("* * 1 * * *", require('./create_user_attendances'), true);
}

function schedule(interval, fn, runImmediately) {
    if (runImmediately) fn()
    cron.schedule(interval, fn)
}