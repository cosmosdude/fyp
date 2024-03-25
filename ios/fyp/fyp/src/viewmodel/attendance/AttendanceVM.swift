//
//  AttendanceVM.swift
//  fyp
//
//  Created by Thwin Htoo Aung on 25/3/24.
//

import Foundation
import Combine
import TANetworking

final class AttendanceVM: @unchecked Sendable {
    
    @Published
    private(set) var attendances: [Attendance] = []
    
    let service = AttendanceService(accessToken: LoginModel.accessToken ?? "")
    
    var from: Date?
    var to: Date?
    
    func fetch() {
        Task(operation: _fetch)
    }
    
    @Sendable
    private func _fetch() async throws {
        attendances = (try? await service.getMyAttendances(
            from: from, to: to
        ).map(Attendance.init)) ?? []
    }
    
    func setDateToCurrent() {
        from = Date()
        to = Date()
    }
    
    func setDateFromMonthStartToCurrentDate() {
        let current = Date()
        
        let calendar = Calendar(identifier: .gregorian)
        var components = calendar.dateComponents([.day, .month, .year], from: current)
        components.day = 1
        let start = calendar.date(from: components)!
        
        self.from = start
        self.to = current
    }
    
}
