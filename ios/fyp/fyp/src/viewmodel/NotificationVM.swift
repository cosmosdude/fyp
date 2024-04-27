//
//  NotificationVM.swift
//  fyp
//
//  Created by Thwin Htoo Aung on 23/3/24.
//

import Foundation
import Combine
import TANetworking

final class NotificationVM: StatusVM<Void, String> {
    
    @Published
    private(set) var notifications = [Noti]()
    
    let notiService = NotificationService(
        accessToken: LoginModel.accessToken ?? ""
    )
    
    func fetchNotifications() {
        Task(operation: _fetchNotifications)
    }
    
    @Sendable
    private func _fetchNotifications() async {
        let service = notiService
        
        notifications = (try? await service.fetchNotifications())?.map(Noti.init) ?? []
    }
    
    func read(at index: Int) {
        Task { await _read(at: index) }
    }
    
    @Sendable
    private func _read(at index: Int) async {
        try? await notiService.markAsRead(id: notifications[index].id)
    }
    
}
