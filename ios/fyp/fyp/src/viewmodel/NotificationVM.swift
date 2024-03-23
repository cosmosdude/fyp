//
//  NotificationVM.swift
//  fyp
//
//  Created by Thwin Htoo Aung on 23/3/24.
//

import Foundation
import Combine
import TANetworking

final class NotificationVM {
    
    @Published
    private(set) var notifications = [Noti]()
    
    init() {
        
    }
    
    func fetchNotifications() {
        Task(operation: _fetchNotifications)
    }
    
    @Sendable
    private func _fetchNotifications() async {
        guard let accessToken = LoginModel.accessToken else { return }
        
        let service = NotificationService(accessToken: accessToken)
        
        notifications = (try? await service.fetchNotifications())?.map(Noti.init) ?? []
    }
    
}
