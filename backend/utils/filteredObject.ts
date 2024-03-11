/**
 * 
 * Remove any property from given object with name not in given key list.
 * 
 * @param {*} obj Object to filter property
 * @param {*} keys Keys to include when filtering.
 * @returns Filtered object
 */
module.exports = (obj, keys) => {

    console.log(keys)

    let set: any = null
    // if already a set, take it as such.
    if (keys instanceof Set) set = keys
    // if is an array, convert to set.
    if (Array.isArray(keys)) set = new Set(keys)
    // if the set is still unable to be resolved,
    // return objects as is
    if (!set) return obj

    let purgedObject = Object.fromEntries(
        Object.entries(obj)
            // property having coresponding column name
            // or with valid value
            .filter(([k, v]) => set.has(k) && v)
    )
    return purgedObject
}

exports.test = (key: string) => {
    console.log("The Key Is", key)
    console.log("Type of key is", typeof(key))
}