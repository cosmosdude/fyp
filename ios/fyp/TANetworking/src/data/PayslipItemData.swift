//
//  PayslipItemData.swift
//  TANetworking
//
//  Created by Thwin Htoo Aung on 29/3/24.
//

import Foundation

public struct PayslipItemData: Codable {
    public let iid: Int
    public let id: String
    public let payslipId: String
    public let payrollItemId: String
    public let name: String
    public let amount: Double
    public let relativeAmount: Int
    public let type: String

    public enum CodingKeys: String, CodingKey {
        case iid
        case id
        case payslipId = "payslip_id"
        case payrollItemId = "payroll_item_id"
        case name
        case amount
        case relativeAmount = "relative_amount"
        case type
    }
}
