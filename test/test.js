let fs = require('fs')
fs.unlink('removethis', err => {
    if (err) console.log("Error", err)
    else console.log("File removed")
})