//
//  Config.swift
//  TANetworking
//
//  Created by Thwin Htoo Aung on 16/3/24.
//

import Foundation
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

public enum ApiPath: String {
    case login = "api/auth/login"
    
    case me = "api/users/user/me"
}
