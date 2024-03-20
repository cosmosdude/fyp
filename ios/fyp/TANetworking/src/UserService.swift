//
//  UserService.swift
//  TANetworking
//
//  Created by Thwin Htoo Aung on 19/3/24.
//

import Foundation
import Alamofire

public struct UserService {
    
    public init() {}
    
    /// Me info.
    public func me(accessToken: String) async throws -> UserData {
        let req = AF.request(
            Api.route(.me), method: .get,
            headers: [
                .authorization(bearerToken: accessToken)
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
    
}
