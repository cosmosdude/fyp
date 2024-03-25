//
//  AttendanceService.swift
//  TANetworking
//
//  Created by Thwin Htoo Aung on 25/3/24.
//

import Foundation
import Alamofire

public struct AttendanceService {
    
    let accessToken: String
    
    public init(accessToken: String? = nil) {
        self.accessToken = accessToken ?? ""
    }
    
}

extension AttendanceService {
    
    public func getMyAttendances(from: Date? = nil, to: Date? = nil) async throws -> [AttendanceData] {
        
        let dateF = DateFormatter()
        dateF.locale = Locale(identifier: "en_US_POSIX")
        dateF.dateFormat = "yyyy-MM-dd"
        
        let req = AF.request(
            Api.route(.myAttendances), method: .get,
            parameters: [
                "from": from.map(dateF.string(from:)) ?? "",
                "to": to.map(dateF.string(from:)) ?? ""
            ],
            encoding: URLEncoding(destination: .queryString),
            headers: [
                .authorization(bearerToken: accessToken)
            ]
        )
        req.responseString { res in print("response", res.value ?? "") }
        
        let res = await req.serializingDecodable([AttendanceData].self).response
        
        guard (200..<300) ~= res.response?.statusCode ?? 0 else {
            print(res)
            throw "Unable to get ot requests"
        }
        
        let data: [AttendanceData]
        do {
            data = try res.result.get()
        } catch {
            console.error("Error \(error)")
            throw error
        }
        return data
    }
    
}
    
extension AttendanceService {
    
    public func requestAttendance(
        date: Date, time: Date,
        type: String,
        lat: Double?, lng: Double?,
        recipientId: String, reason: String?
    ) async throws -> Void {
        
        
        let request = try URLRequest(
            url: Api.route(.requestAttendance),
            method: .post,
            headers: [.authorization(bearerToken: accessToken)]
        )
        //
        let dateF = DateFormatter()
        dateF.dateFormat = "yyyy-MM-dd"
        let timeF = DateFormatter()
        timeF.locale = Locale(identifier: "en_US_POSIX")
        timeF.dateFormat = "HH:mm:ss"
            
        let payload = [
            "date": dateF.string(from: date),
            "time": timeF.string(from: time),
            "type": type,
            "lat": lat == nil ? String(lat!) : "",
            "lng": lat == nil ? String(lat!) : "",
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

extension AttendanceService {
    
    public func attendanceRequestDetail(id: String) async throws -> AttendanceRequestData {
        let req = AF.request(
            Api.route(.attendanceRequestDetail(id: id)), method: .get,
            headers: [
                .authorization(bearerToken: accessToken)
            ]
        )
        req.responseString { res in print("response", res.value ?? "") }
        
        let res = await req.serializingDecodable(AttendanceRequestData.self).response
        
        guard (200..<300) ~= res.response?.statusCode ?? 0 else {
            print(res)
            throw "Unable to get leave request detail"
        }
        
        let data: AttendanceRequestData
        do {
            data = try res.result.get()
        } catch {
            console.error("Error \(error)")
            throw error
        }
        return data
    }
    
}

extension AttendanceService {
    public enum ResponseStatus: String {
        case approve = "approved"
        case reject = "rejected"
    }
    
    public func respondAttendanceRequest(
        id: String, // approved | rejected
        reason: String,
        status: ResponseStatus
    ) async throws {
        
        let req = AF.request(
            Api.route(.respondAttendanceRequest(id: id)),
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
