//
//  RequestOvertimeVM.swift
//  fyp
//
//  Created by Thwin Htoo Aung on 24/3/24.
//

import Foundation
import TANetworking

final class RequestOvertimeVM: StatusVM<Void, String> {
    
    let service = OvertimeService(accessToken: LoginModel.accessToken)
    
    struct Request {
        let date: Date
        let duration: Int
        let recipientId: String
        let reason: String?
    }
    
    func request(_ req: Request) {
        Task { await _request(req) }
    }
    
    @Sendable
    private func _request(_ req: Request) async {
        status = .processing
        do {
            try await service.requestOvertime(
                date: req.date,
                duration: req.duration,
                recipientId: req.recipientId,
                reason: req.reason
            )
            status = .success
        } catch {
            status = .failure(error.localizedDescription)
        }
    }
    
}
