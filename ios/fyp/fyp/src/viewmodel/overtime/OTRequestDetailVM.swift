//
//  OTRequestDetailVM.swift
//  fyp
//
//  Created by Thwin Htoo Aung on 25/3/24.
//

import Foundation
import TANetworking

final class OTRequestDetailVM: StatusVM<Void, String> {
    
    var id: String = ""
    let service = OvertimeService(accessToken: LoginModel.accessToken ?? "")
    
    @Published
    private(set) var detail: OTRequest?
}

extension OTRequestDetailVM {
    
    func fetchDetail() {
        Task(operation: _fetchDetail)
    }
    
    @Sendable
    private func _fetchDetail() async {
        status = .processing
        do {
            detail = .init(try await service.overtimeRequestDetail(id: id))
            status = .success
        } catch {
            status = .failure(error.localizedDescription)
        }
    }
    
}
