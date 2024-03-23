//
//  NotificationData.swift
//  TANetworking
//
//  Created by Thwin Htoo Aung on 23/3/24.
//

import Foundation

public struct NotificationData: Codable {
    public let iid: Int
    public let id: String
    public let title: String?
    public let body: String?
    public let createdAt: String?
    public let readAt: String?
    public let userId: String?
    public let type: String?
    public let leaveRequestId: String?
    
    private enum CodingKeys: String, CodingKey {
        case iid
        case id
        case title
        case body
        case createdAt = "created_at"
        case readAt = "read_at"
        case userId = "user_id"
        case type
        case leaveRequestId = "leave_request_id"
    }
}
