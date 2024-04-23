//
//  LeaveRequest.swift
//  TANetworking
//
//  Created by Thwin Htoo Aung on 22/3/24.
//

import Foundation

public struct LeaveRequestData: Codable {
    public let iid: Int
    public let id: String
    public let fromDate: String
    public let toDate: String
    public let requesterId: String?
    public let recipientId: String?
    public let responderId: String?
    public let requestMsg: String?
    public let responseMsg: String?
    public let status: String
    public let requestedAt: String
    public let respondedAt: String?
    public let outstandingBalance: Double?
    public let leaveId: String
    public let halfday: String?
    public let leaveName: String
    public let requesterFirstName: String?
    public let requesterLastName: String?
    public let requesterAvatarPath: String?
    public let recipientFirstName: String?
    public let recipientLastName: String?
    public let recipientAvatarPath: String?
    public let responderFirstName: String?
    public let responderLastName: String?
    public let responderAvatarPath: String?
    
    public let attachments: [LeaveAttachment]?
    
    private enum CodingKeys: String, CodingKey {
        case iid
        case id
        case fromDate = "from_date"
        case toDate = "to_date"
        case requesterId = "requester_id"
        case recipientId = "recipient_id"
        case responderId = "responder_id"
        case requestMsg = "request_msg"
        case responseMsg = "response_msg"
        case status
        case requestedAt = "requested_at"
        case respondedAt = "responded_at"
        case outstandingBalance = "outstanding_balance"
        case leaveId = "leave_id"
        case halfday
        case leaveName = "leave_name"
        case requesterFirstName = "requester_first_name"
        case requesterLastName = "requester_last_name"
        case requesterAvatarPath = "requester_avatar_path"
        case recipientFirstName = "recipient_first_name"
        case recipientLastName = "recipient_last_name"
        case recipientAvatarPath = "recipient_avatar_path"
        case responderFirstName = "responder_first_name"
        case responderLastName = "responder_last_name"
        case responderAvatarPath = "responder_avatar_path"
        
        case attachments
    }
}


public struct LeaveAttachment: Codable {
    public let id: Int
//    public let originalName: String
    public let name: String
    public let `extension`: String
    public let path: String
    public let mime: String
    public let size: Int
}
