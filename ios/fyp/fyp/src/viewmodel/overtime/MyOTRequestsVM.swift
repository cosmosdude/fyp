//
//  MyOTRequestsVM.swift
//  fyp
//
//  Created by Thwin Htoo Aung on 25/3/24.
//

import Foundation
import TANetworking
import Combine

final class MyOTRequestsVM {
    
    @Published
    private(set) var requests: [OTRequest] = []
    
    let service = OvertimeService(accessToken: LoginModel.accessToken ?? "")
    
    func fetchRequests() {
        Task(operation: _fetchRequests)
    }
    
    @Sendable
    private func _fetchRequests() async throws {
        requests = (try? await service.getMyOvertimeRequests().map {
            .init($0)
        }) ?? []
    }
    
}
