//
//  PayslipVM.swift
//  fyp
//
//  Created by Thwin Htoo Aung on 29/3/24.
//

import Foundation
import TANetworking

final class PayslipVM: @unchecked Sendable {
    
    @Published
    private(set) var payslips: [PayslipDetail] = []
    
    let service = PayslipService(accessToken: LoginModel.accessToken ?? "")
    
    func fetch() {
        Task(operation: _fetch)
    }
    
    @Sendable
    private func _fetch() async throws {
        payslips = (try? await service.getPayslips().map(PayslipDetail.init)) ?? []
    }
    
}
