//
//  Notification.swift
//  fyp
//
//  Created by Thwin Htoo Aung on 23/3/24.
//

import Foundation
import TANetworking

/// Notification Data
struct Noti: NetworkTypeProxy {
 
    let value: NotificationData
    
    init(_ value: NotificationData) { self.value = value }
    
    enum NotificationType: String {
        /// System notification
        case system
        /// Leave request notification
        case leaveRequest = "leave_request"
    }
    
    var type: NotificationType {
        NotificationType(rawValue: value.type ?? "") ?? .system
    }
    
    private static let inFormat = DateFormatter()
        .with(dateFormat: "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'")
    
    var createDate: Date? {
        Self.inFormat.date(from: value.createdAt ?? "")
    }
    
    var isRead: Bool {
        value.readAt != nil
    }
    
}
