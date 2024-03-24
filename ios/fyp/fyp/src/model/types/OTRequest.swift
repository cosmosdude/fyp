//
//  OTRequestDetail.swift
//  fyp
//
//  Created by Thwin Htoo Aung on 25/3/24.
//

import Foundation
import TANetworking

struct OTRequest: NetworkTypeProxy {
    let value: OvertimeRequestData
    
    init(_ value: OvertimeRequestData) {
        self.value = value
    }
    
    static let iso = ISO8601DateFormatter()
        .adding(formatOptions: .withFractionalSeconds)
    
    var date: Date? {
        Self.iso.date(from: value.dateString)
    }
    
    var requesterAvatarURL: URL? {
        self.requesterAvatarPath.map(Api.route).flatMap(URL.init(string:))
    }
    
    var requesterFullName: String {
        [self.requesterFirstName, self.requesterLastName]
            .compactMap{$0}
            .joined(separator: " ")
    }
    
    var recipientAvatarURL: URL? {
        self.recipientAvatarPath.map(Api.route).flatMap(URL.init(string:))
    }
    var recipientFullName: String {
        [self.recipientFirstName, self.recipientLastName]
            .compactMap{$0}
            .joined(separator: " ")
    }
    
    var responderAvatarURL: URL? {
        self.responderAvatarPath.map(Api.route).flatMap(URL.init(string:))
    }
    var responderFullName: String {
        [self.responderFirstName, self.responderLastName]
            .compactMap{$0}
            .joined(separator: " ")
    }
}
