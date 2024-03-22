//
//  RequestLeaveVM.swift
//  fyp
//
//  Created by Thwin Htoo Aung on 22/3/24.
//

import Foundation
import Combine
import TANetworking

final class RequestLeaveVM {
    
//leave_id:bc5491f0-e78a-11ee-99b0-52db3199040c
//from_date:2024-1-3
//to_date:2024-1-3
//recipient_id:8cd08bee-e1b5-11ee-a617-52db3199040b
//halfday:
//request_msg:Hello
    
    let leaveService = LeaveService(accessToken: LoginModel.accessToken)
    
    
    enum Status {
        case processing
        case success
        case failure(error: String)
    }
    
    @Published
    private(set) var status: Status?
    
    
    struct RequestObject {
        let leaveId: String
        let from: Date
        let to: Date
        let recipientId: String
        let type: String
        let reason: String?
    }
    
    func request(request: RequestObject) {
        Task { await _request(request: request) }
    }
    
    @Sendable
    func _request(request req: RequestObject) async {
        status = .processing
        do {
            try await leaveService.requestLeave(
                leaveId: req.leaveId,
                from: req.from,
                to: req.to,
                recipientId: req.recipientId,
                halfday: req.type,
                reason: req.reason
            )
            status = .success
        } catch {
            status = .failure(error: "Unable to request leave")
        }
        
    }
    
    
    
}
