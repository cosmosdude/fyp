//
//  LeaveRequest.swift
//  fyp
//
//  Created by Thwin Htoo Aung on 22/3/24.
//

import Foundation
import TANetworking

@dynamicMemberLookup
struct LeaveRequest: NetworkTypeProxy {
    
    let value: LeaveRequestData
    
    init(_ value: LeaveRequestData) { self.value = value }
    
//    subscript<T>(dynamicMember keyPath: KeyPath<LeaveRequestData, T>) -> T {
//        get { value[keyPath: keyPath] }
//    }
    
//    static let f = {
//        let f = DateFormatter()
//        // 2024-03-21T17:19:56.000Z
//        f.dateFormat = "yyyy-MM-ddTHH:mm:ss.SSSZ"
//        return f
//    }()
    static let f = ISO8601DateFormatter()
        .with(formatOptions: [.withInternetDateTime, .withFractionalSeconds])
    
    var from: Date? {
        return Self.f.date(from: self.fromDate)
    }
    
    var to: Date? {
        return Self.f.date(from: self.toDate)
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
    
    /// Get attachment urls
    var attachmentURLs: [URL] {
        value.attachments?.map(\.path).map(Api.route).compactMap(URL.init(string:)) ?? []
    }
    
}
