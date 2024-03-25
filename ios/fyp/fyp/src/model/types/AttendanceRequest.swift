//
//  AttendanceRequest.swift
//  fyp
//
//  Created by Thwin Htoo Aung on 25/3/24.
//

import Foundation
import TANetworking
import CoreLocation

struct AttendanceRequest: NetworkTypeProxy {
    
    let value: AttendanceRequestData
    
    init(_ value: AttendanceRequestData) {
        self.value = value
    }
    
    static let iso = ISO8601DateFormatter()
        .adding(formatOptions: .withFractionalSeconds)
    
    var date: Date? {
        Self.iso.date(from: value.dateString)
    }
    
    static let timeF = DateFormatter()
        .with(locale: .init(identifier: "en_US_POSIX"))
        .with(dateFormat: "HH:mm:ss")
    
    var time: Date? {
        Self.timeF.date(from: value.timeString)
    }
    
    var coordinate: CLLocationCoordinate2D? {
        guard let lat = Double(value.lat ?? ""), let lng = Double(value.lng ?? "")
        else { return nil }
        
        return .init(latitude: lat, longitude: lng)
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
