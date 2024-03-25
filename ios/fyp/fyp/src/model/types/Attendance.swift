//
//  Attendance.swift
//  fyp
//
//  Created by Thwin Htoo Aung on 25/3/24.
//

import Foundation
import TANetworking

struct Attendance: NetworkTypeProxy {
    
    let value: AttendanceData
    init(_ value: AttendanceData) {
        self.value = value
    }
    
    let dateF = ISO8601DateFormatter().adding(formatOptions: .withFractionalSeconds)
    
    var date: Date! {
        dateF.date(from: value.date)
    }
    
    let timeF = DateFormatter()
        .with(locale: Locale(identifier: "en_US_POSIX"))
        .with(dateFormat: "HH:mm:ss")
    
    var checkInTime: Date? { value.checkinAt.flatMap(timeF.date(from:)) }
    var checkOutTime: Date? { value.checkoutAt.flatMap(timeF.date(from:)) }
    var startTime: Date? { value.startAt.flatMap(timeF.date(from:)) }
    var endTime: Date? { value.endAt.flatMap(timeF.date(from:)) }
    
    var isOff: Bool { startTime == nil }
    
    var isHoliday: Bool { value.isHoliday.toBool }
    var isOnLeave: Bool { value.isOnLeave.toBool }
    
}
