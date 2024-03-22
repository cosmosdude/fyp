//
//  UserService.swift
//  TANetworking
//
//  Created by Thwin Htoo Aung on 19/3/24.
//

import Foundation
import Alamofire

public struct UserService {
    
    let accessToken: String
    
    public init(accessToken: String? = nil) {
        self.accessToken = accessToken ?? ""
    }
    
    /// Me info.
    public func me(accessToken: String? = nil) async throws -> UserData {
        let req = AF.request(
            Api.route(.me), method: .get,
            headers: [
                .authorization(bearerToken: accessToken ?? self.accessToken)
            ]
        )
        req.responseString { res in print("response", res.value ?? "") }
        
        let res = await req.serializingDecodable(UserData.self).response
        
        guard (200..<300) ~= res.response?.statusCode ?? 0 else {
            print(res)
            throw "Unable to get user data"
        }
        
        let data = try res.result.get()
        return data
    }
    
    public enum ManagerType {
        /// all HR Personals
        case hr
        /// Assigned managers
        case assigned
    }
    
    public func fetchManagers(_ type: ManagerType) async throws -> [ManagerUserData] {
        let req = AF.request(
            type == .assigned
            ? Api.route(.myManagers)
            : Api.route(.hrManagers), method: .get,
            headers: [
                .authorization(bearerToken: accessToken)
            ]
        )
        req.responseString { res in print("response", res.value ?? "") }
        
        let res = await req.serializingDecodable([ManagerUserData].self).response
        
        guard (200..<300) ~= res.response?.statusCode ?? 0 else {
            print(res)
            throw "Unable to get Managers"
        }
        
        let data: [ManagerUserData]
        do {
            data = try res.result.get()
        } catch {
            console.error("Error \(error)")
            throw error
        }
        return data
    }
    
}
