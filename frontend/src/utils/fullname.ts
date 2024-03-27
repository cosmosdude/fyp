/// Get full name from given first name and last name.
export function fullname(first?: string|null, last?: string|null) {
    return [first, last].filter(x=>!!x).join(' ')
}