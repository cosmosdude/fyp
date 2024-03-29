//
//  PayslipDetailData.swift
//  TANetworking
//
//  Created by Thwin Htoo Aung on 29/3/24.
//

import Foundation

public struct PayslipDetailData: Codable {
    public let firstName: String?
    public let lastName: String?
    public let avatarPath: String?
    public let iid: Int?
    public let id: String?
    public let userId: String?
    public let name: String?
    public let fromDate: String?
    public let toDate: String?
    public let salary: Int?
    public let tax: Double?
    public let ssb: Int?
    public let overtime: Int?
    public let createdAt: String?
    public let deletedAt: String?
    public let acknowledgedAt: String?

    public enum CodingKeys: String, CodingKey {
        case firstName = "first_name"
        case lastName = "last_name"
        case avatarPath = "avatar_path"
        case iid
        case id
        case userId = "user_id"
        case name
        case fromDate = "from_date"
        case toDate = "to_date"
        case salary
        case tax
        case ssb
        case overtime
        case createdAt = "created_at"
        case deletedAt = "deleted_at"
        case acknowledgedAt = "acknowledged_at"
    }
}
