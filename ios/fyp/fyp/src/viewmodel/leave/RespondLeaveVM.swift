//
//  RespondLeaveVM.swift
//  fyp
//
//  Created by Thwin Htoo Aung on 22/3/24.
//

import Foundation
import TANetworking

final class RespondLeaveVM: StatusVM<Void, String>{
    
    /// Leave request id to process. If nil, operation is skipped.
    var leaveRequestId: String?
    
    let leaveService = LeaveService(accessToken: LoginModel.accessToken ?? "")
    
//    enum Status {
//        case processing
//        case success
//        case failure(error: String)
//    }
//    
//    @Published
//    private(set) var status: Status?
    
    struct Response {
        let message: String
        let status: LeaveService.ResponseStatus
    }
    
    func respond(_ response: Response) {
        if (leaveRequestId == nil) { return }
        Task { await _respond(response)}
    }
    
    func _respond(_ res: Response) async {
        status = .processing
        do {
            try await leaveService.respondLeaveRequest(
                id: leaveRequestId ?? "", reason: res.message,
                status: res.status
            )
            status = .success
        } catch {
            status = .failure(error.localizedDescription)
        }
        
    }
    
}
