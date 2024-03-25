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
        /// Overtime request notification
        case overtimeRequest = "overtime_request"
        
        /// Attendance request notification
        case attendanceRequest = "attendance_request"
    }
    
    var type: NotificationType {
        NotificationType(rawValue: value.type ?? "") ?? .system
    }
    
    private static let inFormat = ISO8601DateFormatter()
        .adding(formatOptions: .withFractionalSeconds)
    
    var createDate: Date? {
        Self.inFormat.date(from: value.createdAt ?? "")
    }
    
    var isRead: Bool {
        value.readAt != nil
    }
    
}
