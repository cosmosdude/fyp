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
    private(set) var user: User?
    
    var id: String = "me"
    
    init() {
        // load from local storage
        user = UserModel.user.map(User.init)
    }
    
    func fetchUser() {
        Task { try? await fetchUser() }
    }
    
    private func fetchUser() async throws {
        guard let token = LoginModel.accessToken else { return }
        do {
            let rawUser = try await UserService().me(accessToken: token, id: id)
            if (id == "me") {
                UserModel.user = rawUser
            }
            self.user = User(rawUser)
        }
        
    }
    
}
