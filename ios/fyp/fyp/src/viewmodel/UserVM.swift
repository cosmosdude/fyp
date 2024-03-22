//
//  UserVM.swift
//  fyp
//
//  Created by Thwin Htoo Aung on 22/3/24.
//

import Foundation
import Combine
import TANetworking

final class UserVM {
    
    @Published
    private(set) var user: UserData?
    
    init() {
        // load from local storage
        user = UserModel.user
    }
    
    func fetchUser() {
        Task { try? await fetchUser() }
    }
    
    private func fetchUser() async throws {
        guard let token = LoginModel.accessToken else { return }
        let user = try await UserService().me(accessToken: token)
        self.user = user
    }
    
}
