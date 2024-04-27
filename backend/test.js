const apns = require("./utils/apns")

async function main() {
    console.log("Testing")
    apns.send({
        title: "Test title", 
        body: "Test body",
    })
}

main().then(() => {

})