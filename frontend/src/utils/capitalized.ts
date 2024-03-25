export function capitalize(str: string|null|undefined) {
    if (!str) return str
    return str.split(" ").map(capitalizedWord).join(" ")
}

function capitalizedWord(str: string|null|undefined) {
    if (!str) return str
    return str.charAt(0).toUpperCase() + str.slice(1)
}