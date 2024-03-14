const fs = require('fs')
const { dirname } = require('path')

/**
 * Public folder path in string.
*/
const publicFolder = `${dirname(require.main.filename)}/public`
/**
 * Uploads folder path in string
 */
const uploadsFolderPath = `${publicFolder}/uploads`

/**
 * Remove given from `public` folder.
*/
exports.removeFile = (filename, callback) => {
    console.log("Given Filename", filename)
    if (!filename) return callback?.(null)
    let removeFilepath = publicFolder + '/' + filename
    console.log("Removing file at", removeFilepath)
    fs.unlink(removeFilepath, callback)
}

/**
 * Move file with given info to public/uploads folder
*/
exports.moveToUploads = (file) => {
    /*
    // expected format
    { 
        "size": 112691,
        "filepath": "/var/folders/gm/ql3m_vqj4lz3b6wwyj8lr6jw0000gn/T/12c8f734a394d1c82c446d500",
        "newFilename": "12c8f734a394d1c82c446d500",
        "mimetype": "application/pdf",
        "mtime": "2024-03-04T05:48:01.822Z",
        "originalFilename": "Beynon-Davies_et_al-2000-Information_Systems_Journal.pdf"
    }
    */
    if (file) return moved(prepared(file))
    else return null
}

function prepared(file) {
    let info = {
        size: file.size,
        filepath: file.filepath,
        newFilename: file.newFilename,
        mimetype: file.mimetype,
        mtime: file.mtime,
        originalFilename: file.originalFilename
    }

    // prepare uuid name
    info.uuidFilename = require('crypto').randomUUID()
    info.potentialFilename = info.uuidFilename

    // prepare extension
    let parts = info.originalFilename.split('.')
    info.extension = '' // <- assume empty extension by default
    if (parts.length > 1) {
        // take extension
        info.extension = parts[parts.length - 1]
        // since extension exists, filename should become `name.ext`
        info.potentialFilename += '.' + info.extension
    }
    return info
}

function moved(file) {
    let info = {...file}
    try {
        let fromPath = info.filepath
        // compose `to` path
        let toPath = uploadsFolderPath + '/' + info.potentialFilename
        console.log('tmp path:', info.filepath)
        console.log('upload path:', toPath)
        fs.renameSync(
            fromPath, 
            toPath
        )
        // if successful, assign uploaded path
        info.uploadedFilepath = 'uploads/' + info.potentialFilename
        info.uploadedFullFilepath = toPath
        info.uploadedFilename = info.potentialFilename
    } catch (error) {
        console.log("Unable to rename file")
        console.log(error)
    }
    return info
}