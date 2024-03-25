//
//  RespondAttendanceVM.swift
//  fyp
//
//  Created by Thwin Htoo Aung on 25/3/24.
//

import Foundation
import TANetworking

final class RespondAttendanceVM: StatusVM<Void, String>{
    
    /// Leave request id to process. If nil, operation is skipped.
    var id: String?
    
    let service = AttendanceService(accessToken: LoginModel.accessToken ?? "")
    
    struct Response {
        let message: String
        let status: AttendanceService.ResponseStatus
    }
    
    func respond(_ response: Response) {
        if (id == nil) { return }
        Task { await _respond(response)}
    }
    
    func _respond(_ res: Response) async {
        status = .processing
        do {
            try await service.respondAttendanceRequest(
                id: id ?? "", reason: res.message,
                status: res.status
            )
            status = .success
        } catch {
            status = .failure(error.localizedDescription)
        }
        
    }
    
}
