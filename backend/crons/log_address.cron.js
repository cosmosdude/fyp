
module.exports = function () {
    console.log("+-------------------------+");
    let addresses = require('os').networkInterfaces()
    let en0 = addresses?.en0
    let ipv4 = en0?.filter(x => x.family === 'IPv4')?.[0]
    if (ipv4) {
        console.log(`| http://${ipv4.address}:3000 |`)
    } else {
        console.log(`Not Connected to a network.`)
    }
    console.log("+-------------------------+")

}