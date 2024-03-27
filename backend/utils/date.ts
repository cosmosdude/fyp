

export function getWeek(d: Date = new Date()): Date[] {
    if (!d || isNaN(d.getTime())) return []

    // start of week
    d.setDate(d.getDate() - d.getDay())
    
    let week = [new Date(d.getTime())]
    
    let n = 6
    while (n--) {
        d = new Date(d.getTime())
        d.setDate(d.getDate() + 1)
        week = [...week, new Date(d.getTime())]
    }

    return week
}

export function getMonth(d: Date = new Date()): Date[] {
    if (!d || isNaN(d.getTime())) return []
    
    // start of week
    d.setDate(1)
    
    let m = d.getMonth()

    let month: Date[] = []
    
    while (m === d.getMonth()) {
        month = [...month, new Date(d.getTime())]
        d = new Date(d.getTime())
        d.setDate(d.getDate() + 1)
    }

    return month
}
