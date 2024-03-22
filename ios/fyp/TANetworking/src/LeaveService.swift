//
//  LeaveService.swift
//  TANetworking
//
//  Created by Thwin Htoo Aung on 22/3/24.
//

import Foundation
import Alamofire
import OSLog

public struct LeaveService {
    
    let accessToken: String
    
    public init(accessToken: String) {
        self.accessToken = accessToken
    }
    
    public func fetchLeaveBalances() async throws -> [LeaveBalanceData] {
        
        let req = AF.request(
            Api.route(.leaveBalance), method: .get,
            headers: [
                .authorization(bearerToken: accessToken)
            ]
        )
        req.responseString { res in print("response", res.value ?? "") }
        
        let res = await req.serializingDecodable([LeaveBalanceData].self).response
        
        guard (200..<300) ~= res.response?.statusCode ?? 0 else {
            print(res)
            throw "Unable to get user data"
        }
        
        let data = try res.result.get()
        return data
    }
    
    public func fetchMyLeaveRequests() async throws -> [LeaveRequestData] {
        
        let req = AF.request(
            Api.route(.myLeaveRequests), method: .get,
            headers: [
                .authorization(bearerToken: accessToken)
            ]
        )
        req.responseString { res in print("response", res.value ?? "") }
        
        let res = await req.serializingDecodable([LeaveRequestData].self).response
        
        guard (200..<300) ~= res.response?.statusCode ?? 0 else {
            print(res)
            throw "Unable to get leave requests"
        }
        
        let data: [LeaveRequestData]
        do {
            data = try res.result.get()
        } catch {
            console.error("Error \(error)")
            throw error
        }
        return data
    }
}


