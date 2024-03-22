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
    
    public init(accessToken: String?) {
        self.accessToken = accessToken ?? ""
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
    
    public func requestLeave(
        leaveId: String, from: Date, to: Date,
        recipientId: String, halfday: String, reason: String?
    ) async throws -> Void {
//        leave_id:bc5491f0-e78a-11ee-99b0-52db3199040c
//        from_date:2024-1-3
//        to_date:2024-1-3
//        recipient_id:8cd08bee-e1b5-11ee-a617-52db3199040b
//        halfday:
//        request_msg:Hello
        
        let request = try URLRequest(
            url: Api.route(.requestLeave),
            method: .post, 
            headers: [.authorization(bearerToken: accessToken)]
        )
//        
        let f = DateFormatter()
        f.dateFormat = "yyyy-MM-dd"
        
        let payload = [
            "leave_id": leaveId,
            "from_date": f.string(from: from),
            "to_date": f.string(from: to),
            "recipient_id": recipientId,
            "halfday": halfday,
            "request_msg": reason ?? "",
        ]
        
        let req = AF.upload(multipartFormData: { form in
            for (k,v) in payload {
                form.append(v.data(using: .utf8)!, withName: k)
            }
        }, with: request)
        
        
        req.responseString { res in print("response", res.value ?? "") }
        
        let res = await req.serializingString().response
        
        guard (200..<300) ~= res.response?.statusCode ?? 0 else {
            print(res)
            throw "Unable to get leave requests"
        }
        
    }
}


