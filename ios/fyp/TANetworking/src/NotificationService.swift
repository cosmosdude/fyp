//
//  NotificationService.swift
//  TANetworking
//
//  Created by Thwin Htoo Aung on 23/3/24.
//

import Foundation
import Alamofire

public struct NotificationService {
    
    let accessToken: String
    
    public init(accessToken: String?) {
        self.accessToken = accessToken ?? ""
    }
    
    public func fetchNotifications() async throws -> [NotificationData] {
        
        let req = AF.request(
            Api.route(.notifications), method: .get,
            headers: [
                .authorization(bearerToken: accessToken)
            ]
        )
        req.responseString { res in print("response", res.value ?? "") }
        
        let res = await req.serializingDecodable([NotificationData].self).response
        
        guard (200..<300) ~= res.response?.statusCode ?? 0 else {
            print(res)
            throw "Unable to get user data"
        }
        
        do {
            return try res.result.get()
        } catch {
            console.error("Error \(error.localizedDescription)")
            throw error
        }
        
    }
    
}
