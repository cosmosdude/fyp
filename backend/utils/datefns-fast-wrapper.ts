const dfns = require('date-fns');


exports.format = (date: Date, format: string): string => {
    return dfns.format(date, format)
}

