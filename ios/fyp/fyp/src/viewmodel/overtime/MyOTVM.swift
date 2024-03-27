//
//  MyOTVM.swift
//  fyp
//
//  Created by Thwin Htoo Aung on 28/3/24.
//

import Foundation
import TANetworking

final class MyOTVM {
    
    @Published
    private(set) var ot: OvertimeData?
    
    var today: String {
        ot.map { overtimeDurationText(seconds: $0.todaySec) } ?? ""
    }
    
    var week: String {
        ot.map { overtimeDurationText(seconds: $0.weekSec) } ?? ""
    }
    
    var month: String {
        ot.map { overtimeDurationText(seconds: $0.monthSec) } ?? ""
    }
    
    let service = OvertimeService(accessToken: LoginModel.accessToken ?? "")
    
    func fetch() {
        Task(operation: _fetch)
    }
    
    @Sendable
    private func _fetch() async throws {
        do {
            ot = try await service.getMyOvertime()
            print("OT", ot as Any)
        } catch { print("OT", error.localizedDescription) }
        
    }
    
}
