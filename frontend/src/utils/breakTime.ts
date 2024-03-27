/**
 * Get breaktime display text from given value.
*/
export default function breakTimeDisplayText(sec = 0) {
    if (!sec) sec = 0
    let mins = Math.floor(sec / 60)
    let hrs = Math.floor(mins / 60)
    mins = mins % 60
    // return Boolean(mins) ? `${mins} min(s)`: ""
    return [Boolean(hrs) ? `${hrs} hr(s)`: "", Boolean(mins) ? `${mins} min(s)`: ""]
        .filter(x => !!x).join(" ")
}