//
//  LoginModel.swift
//  fyp
//
//  Created by Thwin Htoo Aung on 19/3/24.
//

import Foundation
import TANetworking
import Alamofire

class LoginModel {
    
    private static let defaults = UserDefaults.standard
    
    static var isAuthorized: Bool {
        accessToken != nil
    }
    
    static var accessToken: String? {
        get { defaults.string(forKey: "accessToken") }
        set { defaults.set(newValue, forKey: "accessToken")}
    }
    
    private var username: String = ""
    private var password: String = ""
    
    func set(username: String) {
        self.username = username
            .trimmingCharacters(in: .whitespacesAndNewlines) // trim whitespaces
            .replacingOccurrences(of: " ", with: "") // remove whitespaces
    }
    
    func set(password: String) {
        self.password = password
    }
    
    func validate() throws {
        if (username.isEmpty) { throw "Username must not be empty" }
        if (password.isEmpty) { throw "Password must not be empty" }
        if (password.count < 8) { throw "Password must be at least 8 characters long." }
    }
    
    func login() async throws {
        try validate()
        let token = try await LoginService().login(username: username, password: password)
        Self.accessToken = token.accessToken
    }
    
    /// Clear user data
    static func logout() { accessToken = nil }
    
}
