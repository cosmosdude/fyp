//
//  UserModel.swift
//  fyp
//
//  Created by Thwin Htoo Aung on 19/3/24.
//

import Foundation
import TANetworking

class UserModel {
    
    private static let defaults = UserDefaults.standard
    private static let encoder = JSONEncoder()
    private static let decoder = JSONDecoder()
    private static let key = "user"
    
    /// Saved user
    static var user: UserData? {
        get {
            guard let raw = defaults.data(forKey: key) else { return nil }
            return try! decoder.decode(UserData.self, from: raw)
        }
        set {
            guard let user = newValue else {
                defaults.set(nil, forKey: key)
                return
            }
            defaults.set(
                try! encoder.encode(user),
                forKey: key
            )
        }
    }
    
    /// Fetch users async
    func fetchUser() async throws {
        guard let token = LoginModel.accessToken else { return }
        let user = try await UserService().me(accessToken: token)
        Self.user = user
    }
    
    /// Clear user data
    static func clear() { user = nil }
    
}
