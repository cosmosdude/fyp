const port = 3000

// Schedule Cron Jobs
require('./crons/index.cron').schedule()

// 
require('./app').listen(port, '0.0.0.0', () => {
    console.log(`Server running on`)
    console.log(`http://localhost:${port}`)
    console.log(`http://127.0.0.1:${port}`)

    let addresses = require('os').networkInterfaces()
    let en0 = addresses?.en0
    let ipv4 = en0?.filter(x => x.family === 'IPv4')?.[0]
    if (ipv4) {
        console.log(`http://${ipv4.address}:${port}`)
    }

})
