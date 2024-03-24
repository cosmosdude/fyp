//
//  OvertimeRequestData.swift
//  TANetworking
//
//  Created by Thwin Htoo Aung on 25/3/24.
//

import Foundation

public struct OvertimeRequestData: Codable {
    public let iid: Int
    public let id: String
    public let requesterId: String
    public let recipientId: String
    public let responderId: String?
    public let requestMsg: String?
    public let responseMsg: String?
    public let status: String
    public let requestedAt: String
    public let respondedAt: String?
    public let dateString: String
    public let durationSec: Int
    public let requesterFirstName: String?
    public let requesterLastName: String?
    public let requesterAvatarPath: String?
    public let recipientFirstName: String?
    public let recipientLastName: String?
    public let recipientAvatarPath: String?
    public let responderFirstName: String?
    public let responderLastName: String?
    public let responderAvatarPath: String?
    
    private enum CodingKeys: String, CodingKey {
        case iid
        case id
        case requesterId = "requester_id"
        case recipientId = "recipient_id"
        case responderId = "responder_id"
        case requestMsg = "request_msg"
        case responseMsg = "response_msg"
        case status
        case requestedAt = "requested_at"
        case respondedAt = "responded_at"
        case dateString = "date"
        case durationSec = "duration_sec"
        case requesterFirstName = "requester_first_name"
        case requesterLastName = "requester_last_name"
        case requesterAvatarPath = "requester_avatar_path"
        case recipientFirstName = "recipient_first_name"
        case recipientLastName = "recipient_last_name"
        case recipientAvatarPath = "recipient_avatar_path"
        case responderFirstName = "responder_first_name"
        case responderLastName = "responder_last_name"
        case responderAvatarPath = "responder_avatar_path"
    }
}
