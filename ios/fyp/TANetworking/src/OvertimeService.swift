//
//  OvertimeService.swift
//  TANetworking
//
//  Created by Thwin Htoo Aung on 24/3/24.
//

import Foundation
import Alamofire

public struct OvertimeService {
    
    let accessToken: String
    
    public init(accessToken: String? = nil) { 
        self.accessToken = accessToken ?? ""
    }
    
}

extension OvertimeService {
    
    public func requestOvertime(
        date: Date, duration: Int,
        recipientId: String, reason: String?
    ) async throws -> Void {
//        leave_id:bc5491f0-e78a-11ee-99b0-52db3199040c
//        from_date:2024-1-3
//        to_date:2024-1-3
//        recipient_id:8cd08bee-e1b5-11ee-a617-52db3199040b
//        halfday:
//        request_msg:Hello
        
        let request = try URLRequest(
            url: Api.route(.requestOvertime),
            method: .post,
            headers: [.authorization(bearerToken: accessToken)]
        )
//
        let f = DateFormatter()
        f.dateFormat = "yyyy-MM-dd"
        
        let payload = [
            "date": f.string(from: date),
            "duration": String(duration),
            "recipient_id": recipientId,
            "request_msg": reason ?? "",
        ]
        
        let req = AF.upload(multipartFormData: { form in
            for (k,v) in payload {
                form.append(v.data(using: .utf8)!, withName: k)
            }
        }, with: request)
        
        
        req.responseString { res in print("response", res.value ?? "") }
        
        let res = await req.serializingString().response
        
        let statusCode = res.response?.statusCode ?? 0
        
        if statusCode >= 400  {
            throw try res.result.get()
        }
        
        guard (200..<300) ~= res.response?.statusCode ?? 0 else {
            print(res)
            throw "Unknown Error (status: \(statusCode))"
        }
        
    }
    
    public func overtimeRequestDetail(id: String) async throws -> OvertimeRequestData {
        let req = AF.request(
            Api.route(.overtimeRequestDetail(id: id)), method: .get,
            headers: [
                .authorization(bearerToken: accessToken)
            ]
        )
        req.responseString { res in print("response", res.value ?? "") }
        
        let res = await req.serializingDecodable(OvertimeRequestData.self).response
        
        guard (200..<300) ~= res.response?.statusCode ?? 0 else {
            print(res)
            throw "Unable to get leave request detail"
        }
        
        let data: OvertimeRequestData
        do {
            data = try res.result.get()
        } catch {
            console.error("Error \(error)")
            throw error
        }
        return data
    }
    
    public enum ResponseStatus: String {
        case approve = "approved"
        case reject = "rejected"
    }
    
    public func respondOvertimeRequest(
        id: String, // approved | rejected
        reason: String,
        status: ResponseStatus
    ) async throws {
        
        let req = AF.request(
            Api.route(.respondOvertimeRequest(id: id)),
            method: .put,
            parameters: [
                "response_msg": reason,
                "status": status.rawValue
            ],
            encoder: URLEncodedFormParameterEncoder(destination: .httpBody),
            headers: [
                .authorization(bearerToken: accessToken)
            ]
        )
        
        req.responseString { res in print("response", res.value ?? "") }
        
        let res = await req.serializingString().response
        
        let statusCode = res.response?.statusCode ?? 0
        
        if statusCode >= 400  {
            throw try res.result.get()
        }
        
        guard (200..<300) ~= res.response?.statusCode ?? 0 else {
            print(res)
            throw "Unknown Error (status: \(statusCode))"
        }
        
    }
    
}
