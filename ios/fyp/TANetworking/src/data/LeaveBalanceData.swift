//
//  LeaveBalanceData.swift
//  TANetworking
//
//  Created by Thwin Htoo Aung on 22/3/24.
//

import Foundation

public struct LeaveBalanceData: Codable {
    public let id: String
    public let name: String
    public let balance: Int
    public let initial: Int
    public let max: Int
    public let gender: String
    public let halfday: Int
    public let carried: Int
    public let earnable: Int
}
