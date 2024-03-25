//
//  AttendanceRequestDetailVM.swift
//  fyp
//
//  Created by Thwin Htoo Aung on 25/3/24.
//

import Foundation
import TANetworking

final class AttendanceRequestDetailVM {
    
    let service = AttendanceService(accessToken: LoginModel.accessToken)
    
    var id: String?
    
    @Published
    private(set) var detail: AttendanceRequest?
    
    func fetch() {
        Task { await _fetch()}
    }
    
    func _fetch() async {
        detail = (try? await service.attendanceRequestDetail(id: id ?? ""))
            .map(AttendanceRequest.init)
    }
    
    
}
