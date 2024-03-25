//
//  AttendanceData.swift
//  TANetworking
//
//  Created by Thwin Htoo Aung on 25/3/24.
//

import Foundation

public struct AttendanceData: Codable {
    public let userId: String
    public let date: String
    public let startAt: String?
    public let endAt: String?
    public let checkinAt: String?
    public let checkoutAt: String?
    public let breakSeconds: Int
    public let firstName: String
    public let lastName: String?
    public let holidayName: String?
    public let holidayId: String?
    public let isHoliday: Int
    public let isOnLeave: Int
    public let leaveName: String?
    
    private enum CodingKeys: String, CodingKey {
        case userId = "user_id"
        case date
        case startAt = "start_at"
        case endAt = "end_at"
        case checkinAt = "checkin_at"
        case checkoutAt = "checkout_at"
        case breakSeconds = "break_seconds"
        case firstName = "first_name"
        case lastName = "last_name"
        case holidayName = "holiday_name"
        case holidayId = "holiday_id"
        case isHoliday = "is_holiday"
        case isOnLeave = "is_on_leave"
        case leaveName = "leave_name"
    }
}
