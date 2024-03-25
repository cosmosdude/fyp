//
//  TeamMember.swift
//  fyp
//
//  Created by Thwin Htoo Aung on 25/3/24.
//

import Foundation
import TANetworking

struct TeamMember: NetworkTypeProxy {
    
    let value: TeamMemberData
    
    init(_ value: TeamMemberData) { self.value = value }
    
    var avatarURL: URL? {
        self.avatarPath.map(Api.route).flatMap(URL.init(string:))
    }
    
    var fullName: String {
        return [self.firstName, self.lastName]
            .compactMap{$0}
            .joined(separator: " ")
    }
    
    var position: String {
        return [self.designation, self.department]
            .compactMap{$0}
            .joined(separator: " of ")
    }
    
    let timeF = DateFormatter()
        .with(locale: Locale(identifier: "en_US_POSIX"))
        .with(dateFormat: "HH:mm:ss")
    
    var checkInTime: Date? { value.checkinAt.flatMap(timeF.date(from:)) }
    var checkOutTime: Date? { value.checkoutAt.flatMap(timeF.date(from:)) }
    var startTime: Date? { value.startAt.flatMap(timeF.date(from:)) }
    var endTime: Date? { value.endAt.flatMap(timeF.date(from:)) }
    
    
    var isHoliday: Bool { value.isHoliday.toBool }
    var isOnLeave: Bool { value.isOnLeave.toBool }
    
}
