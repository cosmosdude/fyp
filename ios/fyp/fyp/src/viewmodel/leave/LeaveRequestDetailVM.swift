//
//  LeaveRequestDetailVM.swift
//  fyp
//
//  Created by Thwin Htoo Aung on 22/3/24.
//

import Foundation
import TANetworking
import Combine

final class LeaveRequestDetailVM {
    
    let leaveService = LeaveService(accessToken: LoginModel.accessToken)
    
    @Published
    private(set) var leaveRequestDetail: LeaveRequest?
    
    func fetch(id: String) {
        Task { await _fetch(id: id)}
    }
    
    func _fetch(id: String) async {
        leaveRequestDetail = (try? await leaveService.leaveRequestDetail(id: id))
            .map(LeaveRequest.init)
    }
    
}
