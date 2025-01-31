//
//  Config.swift
//  TANetworking
//
//  Created by Thwin Htoo Aung on 16/3/24.
//

import Foundation
import OSLog
import Alamofire

enum Config {
    
}

/// API Config
public enum Api {
    /// API Host.
    public static let host = "http://localhost:3000/"
    
    public static func route(_ value: String) -> String {
        host + value
    }
    
    public static func route(_ value: ApiPath) -> String {
        route(value.rawValue)
    }
    
}

public struct ApiPath: RawRepresentable, ExpressibleByStringLiteral {

//    case
    
    public let rawValue: String
    public init(_ rawValue: String) { self.rawValue = rawValue }
    public init(rawValue: String) { self.rawValue = rawValue }
    
    public init(stringLiteral value: StringLiteralType) { rawValue = value }
    
    static let login: Self = "api/auth/login"
    static let me: Self = "api/users/user/me"
    static func user(id: String = "me") -> Self {
        .init("api/users/user/\(id)")
    }
    
    static let leaveBalance: Self = "api/leaves/balance"
    
    static let myLeaveRequests: Self = "api/leaves/requests/me"
    
    static func leaveRequestDetail(id: String) -> Self {
        .init("api/leaves/requests/request/\(id)")
    }
    
    static func respondLeaveRequest(id: String) -> Self {
        .init("api/leaves/requests/request/\(id)/response")
    }
    
    static let hrManagers: Self = "api/users/hrs"
    static let myManagers: Self = "api/users/user/managers"
    /// user's team data
    static let team: Self = "api/users/user/team"
    
    static let requestLeave: Self = "api/leaves/requests"
    
    /// notifications api.
    static let notifications: Self = "api/notifications"
    static func readNotification(id: String) -> Self {
        .init("api/notifications/\(id)/read")
    }
    
    // overtime API
    static let requestOvertime: Self = "api/overtimes/requests/request"
    static let myOvertimeRequests: Self = "api/overtimes/requests/me"
    static let myOvertime: Self = "api/overtimes/me"
    static func overtimeRequestDetail(id: String) -> Self {
        .init("api/overtimes/requests/request/\(id)")
    }
    
    static func respondOvertimeRequest(id: String) -> Self {
        .init("api/overtimes/requests/request/\(id)")
    }
    
    // Attendance API
    static let myAttendances: Self = "api/attendances/me"
    static let requestAttendance: Self = "api/attendances/requests/request"
    static func attendanceRequestDetail(id: String) -> Self {
        .init("api/attendances/requests/request/\(id)")
    }
    
    static func respondAttendanceRequest(id: String) -> Self {
        .init("api/attendances/requests/request/\(id)")
    }
    
    // Payslips
    static let payslips: Self = "api/payslips/user/ "
    static func payslipDetail(id: String) -> Self {
        .init("api/payslips/payslip/\(id)")
    }
    static func acknowledgePayslip(id: String) -> Self {
        .init("api/payslips/payslip/\(id)/acknowledge")
    }
}


let console = Logger(subsystem: "TANetworking", category: "networking")
