import { format } from "./fast-date-fns"


/**
 * Get schedule display text from given from and to times (HH:mm:ss format)
*/
export function scheduleDisplayText(from, to) {
    if (!from || !to) return null
    /**
     * @param time Time in HH:mm:ss format
    */
    function dateFromTime(time) {
        return `2000-01-01 ${time}`
    }

    let displyText = [new Date(dateFromTime(from)), new Date(dateFromTime(to))]
        .map(x => {
            return format(x, 'hh:mm a')
        })
        .join(' to ')
    return displyText
}