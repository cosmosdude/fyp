import { format } from "./fast-date-fns"

export default function timeDisplayText(t) {
    if (!t) return null
    // /**
    //  * @param time Time in HH:mm:ss format
    // */
    // function dateFromTime(time) {
    //     return `2000-01-01 ${time}`
    // }

    let displyText = [dateFrom24HrTime(t)]
        .filter(x => x)
        .map(x => {
            return format(x, 'hh:mm a')
        })
        .join(' to ')
    return displyText
}

export function dateFrom24HrTime(t) {
    console.log("dateFrom24HrTime [t]", t)
    if (!t) return null

    let tText = `2000-01-01 ${t}`
    console.log("dateFrom24HrTime [tText]", tText)
    let date = new Date(tText)

    if (isNaN(date.getTime())) return null
    
    return date
}