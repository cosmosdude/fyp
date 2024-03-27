export function position(designation?: string|null, department?: string|null) {
    return [designation, department].filter(x=>!!x).join(' of ')
}