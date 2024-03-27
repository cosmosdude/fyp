import { format as dfnsformat } from "date-fns";

export function format(date, f) {
    return dfnsformat(date, f)
}