//
//  TeamMemberData.swift
//  TANetworking
//
//  Created by Thwin Htoo Aung on 25/3/24.
//

import Foundation

public struct TeamMemberData: Codable {
    public let id: String
    public let firstName: String
    public let lastName: String?
    public let avatarPath: String?
    public let department: String?
    public let designation: String?
    public let startAt: String?
    public let endAt: String?
    public let checkinAt: String?
    public let checkoutAt: String?
    /// 0 if false, 1 otherwise.
    public let isHoliday: Int
    /// 0 if false, 1 otherwise
    public let isOnLeave: Int
    public let leaveName: String?
    
    private enum CodingKeys: String, CodingKey {
        case id
        case firstName = "first_name"
        case lastName = "last_name"
        case avatarPath = "avatar_path"
        case department
        case designation
        case startAt = "start_at"
        case endAt = "end_at"
        case checkinAt = "checkin_at"
        case checkoutAt = "checkout_at"
        case isHoliday = "is_holiday"
        case isOnLeave = "is_on_leave"
        case leaveName = "leave_name"
    }
}
