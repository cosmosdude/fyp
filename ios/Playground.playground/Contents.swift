import UIKit

var greeting = "Hello, playground"

//let f = DateFormatter()
//f.dateFormat = "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'"
//f.string(from: Date())
//f.date(from: "2024-01-02T17:30:00.000Z")

//let iso = ISO8601DateFormatter()
//iso.formatOptions = [.withFullDate, .withFullTime, .withFractionalSeconds]
//iso.date(from: "2024-01-02T17:30:00.000Z")

let f = DateFormatter()
f.dateFormat = "HH:mm:ss"
f.locale = Locale(identifier: "en_US_POSIX")
f.string(from: Date())
