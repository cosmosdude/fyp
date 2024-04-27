const fs = require('fs')
const {exec} = require('node:child_process')

const apns = {

    async send({title = "Title", body = "Body", payload}) {
        let noti = {
            "Simulator Target Bundle": "com.ta1458z.fyp",
            "aps": {
                "alert": {
                    "title": title,
                    "body": body,
                    date: "Current Time"
                }
            },
            "fyp": payload
        }

        let bundleId = "com.ta1458z.fyp"

        let json = JSON.stringify(noti);
        let filename = `/tmp/uog.kmd.fyp.tha.${(new Date()).getTime()}.json`
        console.log(filename)
        console.log(json)
        

        try {
            fs.writeFileSync(filename, json)
            let devices = (await execute('xcrun simctl list devices | grep "Booted"'))
                .stdout
                .split('\n').map(x => x.trim()).filter(x => x)
                .map(x => x.split(' ')).flatMap(x => x).filter(x => x.startsWith('(') && !x.includes('Booted') )
                .map(x => x.replace('(', '').replace(')', ''))

            for (const deviceId of devices) {
                let command = `xcrun simctl push "${deviceId}" "${bundleId}" ${filename}`
                console.log(command)
                // xcrun simctl push "3CE148B3-A337-4C1A-8D00-E98A96CE12AC" "com.ta1458z.fyp" fyp.apns
                execute(command)
            }
        } catch {
            console.log("Unable to send notifications")
        }
    }

}

function execute(command) {
    return new Promise((resolve, reject) => {
        exec(command,  (error, stdout, stderr) => {
            if (error) reject (error)
            else resolve({stdout, stderr})
        })
    })
}


module.exports = apns