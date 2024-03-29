//
//  PayslipService.swift
//  TANetworking
//
//  Created by Thwin Htoo Aung on 29/3/24.
//

import Foundation
import Alamofire

public struct PayslipService {
    
    let accessToken: String
    
    public init(accessToken: String? = nil) {
        self.accessToken = accessToken ?? ""
    }
    
}

extension PayslipService {
    
    public func getPayslips() async throws -> [PayslipDetailData] {
        let req = AF.request(
            Api.route(.payslips), method: .get,
            headers: [
                .authorization(bearerToken: accessToken)
            ]
        )
        req.responseString { res in print("Payslip response", res.value ?? "", res.request as Any) }
        
        let res = await req.serializingDecodable([PayslipDetailData].self).response
        
        guard (200..<300) ~= res.response?.statusCode ?? 0 else {
            print(res)
            throw "Unable to get payslips"
        }
        
        let data: [PayslipDetailData]
        do {
            data = try res.result.get()
        } catch {
            console.error("Error \(error)")
            throw error
        }
        return data
    }
    
    public func getPayslipDetail(id: String) async throws -> PayslipData {
        let req = AF.request(
            Api.route(.payslipDetail(id: id)), method: .get,
            headers: [
                .authorization(bearerToken: accessToken)
            ]
        )
        req.responseString { res in print("response", res.value ?? "") }
        
        let res = await req.serializingDecodable(PayslipData.self).response
        
        guard (200..<300) ~= res.response?.statusCode ?? 0 else {
            print(res)
            throw "Unable to get payslips"
        }
        
        let data: PayslipData
        do {
            data = try res.result.get()
        } catch {
            console.error("Error \(error)")
            throw error
        }
        return data
    }
    
    public func acknowledgePayslip(id: String) async throws {
        let req = AF.request(
            Api.route(.acknowledgePayslip(id: id)), method: .get,
            headers: [
                .authorization(bearerToken: accessToken)
            ]
        )
        req.responseString { res in print("response", res.value ?? "") }
        
        let res = await req.serializingString().response
        
        guard (200..<300) ~= res.response?.statusCode ?? 0 else {
            print(res)
            throw "Unable to get payslips"
        }
    }
}
