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
    public static let host = "http://192.168.1.2:3000/"
    
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
    public init(rawValue: String) { self.rawValue = rawValue }
    
    public init(stringLiteral value: StringLiteralType) { rawValue = value }
    
    static let login: Self = "api/auth/login"
    static let me: Self = "api/users/user/me"
    static let leaveBalance: Self = "api/leaves/balance"
    static let myLeaveRequests: Self = "api/leaves/requests/me"
}



let console = Logger(subsystem: "TANetworking", category: "networking")
