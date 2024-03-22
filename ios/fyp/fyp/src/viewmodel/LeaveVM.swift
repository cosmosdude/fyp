//
//  LeaveVM.swift
//  fyp
//
//  Created by Thwin Htoo Aung on 22/3/24.
//

import Foundation
import Combine
import TANetworking

final class LeaveVM: @unchecked Sendable {
    
    @Published
    private(set) var selectedLeaveType: LeaveType?
    var selectedLeaveTypeIndex: Int? {
        didSet {
            guard let selectedLeaveTypeIndex else { return selectedLeaveType = nil }
            selectedLeaveType = leaveTypes[selectedLeaveTypeIndex]
        }
    }
    
    @Published
    private(set) var leaveTypes: [LeaveType] = []
    
    @Published
    private(set) var leaveRequests: [LeaveRequest] = []
    
    let leaveService = LeaveService(accessToken: LoginModel.accessToken ?? "")
    
    func fetchLeaveTypes() {
        Task(operation: _fetchLeaveTypes)
    }
    
    @Sendable
    private func _fetchLeaveTypes() async throws {
        leaveTypes = (try? await leaveService.fetchLeaveBalances().map {
            LeaveType.init(balance: $0.balance, name: $0.name)
        }) ?? []
    }
    
    func fetchLeaveRequests() {
        Task(operation: _fetchLeaveRequests)
    }
    
    @Sendable
    private func _fetchLeaveRequests() async throws {
        leaveRequests = (try? await leaveService.fetchMyLeaveRequests().map {
            LeaveRequest($0)
        }) ?? []
    }
    
}
