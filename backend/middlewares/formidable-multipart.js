const formidable = require('formidable')

module.exports = async (req, res, next) => {

    // Formidable is only used for form parsing here.
    let contentType = req.headers['content-type']
    // so, if content type is application/json
    // skip to next middleware
    if ('application/json' === contentType) return next() 

    let form = new formidable.IncomingForm()
    // keep original file extensions
    form.keepExtensions = true
    // parse fields and files from the request
    form.parse(req).then(([fields, files]) => {
        req.fields = fields
        console.log('Fields', fields)
        // flat the fields i.e join each array fields by comma
        let flatFields = {}
        for (let [key, each] of Object.entries(fields)) { 
            // console.log(typeof(each))
            if (Array.isArray(each)) flatFields[key] = each.join()
            else flatFields[key] = each
        }
        req.flatFields = flatFields
        console.log('FlatFields', flatFields)

        req.files = files
        console.log("Files", files)
        next()
    }).catch(next)
}