//
//  LoginService.swift
//  TANetworking
//
//  Created by Thwin Htoo Aung on 19/3/24.
//

import Foundation
import Alamofire

public struct LoginService {
    
    public init() {}
    
    public func login(username: String, password: String) async throws -> LoginData {
        let res = await AF.request(
            Api.route(.login), method: .post,
            parameters: [
                "username": username,
                "password": password
            ], encoder: JSONParameterEncoder()
        ).serializingDecodable(LoginData.self).response
        
        guard (200..<300) ~= res.response?.statusCode ?? 0 else {
            throw "Unable to login."
        }
        
        let data = try res.result.get()
        return data
    }
    
}
