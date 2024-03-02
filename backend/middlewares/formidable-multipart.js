const formidable = require('formidable')

module.exports = async (req, res, next) => {
    let form = new formidable.IncomingForm()
    // keep original file extensions
    form.keepExtensions = true
    // parse fields and files from the request
    form.parse(req).then(([fields, files]) => {
        req.fields = fields
        // flat the fields i.e join each array fields by comma
        let flatFields = {}
        for (let [key, each] of Object.entries(fields)) { 
            flatFields[key] = each.join()
        }
        req.flatFields = flatFields

        req.files = files
        console.log(files)
        next()
    }).catch(next)
}