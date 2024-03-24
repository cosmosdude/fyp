//
//  RespondOTVM.swift
//  fyp
//
//  Created by Thwin Htoo Aung on 25/3/24.
//

import Foundation
import TANetworking

final class RespondOTVM: StatusVM<Void, String> {
    
    let service = OvertimeService(accessToken: LoginModel.accessToken)
    
    var id: String?
    
    struct Response {
        let message: String
        let status: OvertimeService.ResponseStatus
    }
    
    func respond(_ response: Response) {
        if (id == nil) { return }
        Task { await _respond(response)}
    }
    
    func _respond(_ res: Response) async {
        status = .processing
        do {
            try await service.respondOvertimeRequest(
                id: id ?? "", reason: res.message,
                status: res.status
            )
            status = .success
        } catch {
            status = .failure(error.localizedDescription)
        }
        
    }
    
}
