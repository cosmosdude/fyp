//
//  PayslipAcknowledgeVM.swift
//  fyp
//
//  Created by Thwin Htoo Aung on 29/3/24.
//

import Foundation
import TANetworking

final class PayslipAcknowledgeVM: StatusVM<Void, String> {
    
    let service = PayslipService(accessToken: LoginModel.accessToken)
    
    var id: String?
    
    func acknowledge() {
        if (id == nil) { return }
        Task { await _acknowledge()}
    }
    
    func _acknowledge() async {
        status = .processing
        do {
            try await service.acknowledgePayslip(id: id ?? "")
            status = .success
        } catch {
            status = .failure(error.localizedDescription)
        }
        
    }
    
}
