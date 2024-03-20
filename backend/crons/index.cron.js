const cron = require('node-cron')

exports.schedule = () => {
    cron.schedule("*/1 1 * * * *", function () {
        console.log("---------------------");
        console.log("running a task every 1 seconds");
    });
}