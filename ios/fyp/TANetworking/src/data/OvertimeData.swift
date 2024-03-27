//
//  OvertimeData.swift
//  TANetworking
//
//  Created by Thwin Htoo Aung on 28/3/24.
//

import Foundation

public struct OvertimeData: Codable {
    public let todaySec: Int
    public let weekSec: Int
    public let monthSec: Int

    public enum CodingKeys: String, CodingKey {
        case todaySec = "today_sec"
        case weekSec = "week_sec"
        case monthSec = "month_sec"
    }
}
