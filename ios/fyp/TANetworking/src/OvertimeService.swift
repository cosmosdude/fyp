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
    
}
