//
//  TeamVM.swift
//  fyp
//
//  Created by Thwin Htoo Aung on 25/3/24.
//

import Foundation
import TANetworking

final class TeamVM {
    
    @Published
    private(set) var teamMembers: [TeamMember] = []
    
    let service = UserService(accessToken: LoginModel.accessToken ?? "")
    
    func fetch() {
        Task(operation: _fetch)
    }
    
    @Sendable
    private func _fetch() async throws {
        teamMembers = (try? await service.fetchTeamMemberStatuses().map {
            .init($0)
        }) ?? []
    }
    
}
