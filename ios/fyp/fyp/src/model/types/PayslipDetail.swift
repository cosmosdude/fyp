//
//  PayslipDetail.swift
//  fyp
//
//  Created by Thwin Htoo Aung on 29/3/24.
//

import Foundation
import TANetworking

public struct PayslipDetail: NetworkTypeProxy {
    let value: PayslipDetailData
    init(_ value: PayslipDetailData) {
        self.value = value
    }
    
    private static let inFormat = ISO8601DateFormatter()
        .adding(formatOptions: .withFractionalSeconds)
    
    public var salary: Double { Double(value.salary ?? 0) }
    public var overtime: Double { Double(value.overtime ?? 0) }
    
    public var tax: Double { Double(value.tax ?? 0) }
    public var ssb: Double { Double(value.ssb ?? 0) }
    
    
    public var from: Date? {
        value.fromDate.flatMap(Self.inFormat.date(from:))
    }
    
    public var to: Date? {
        value.toDate.flatMap(Self.inFormat.date(from:))
    }
}
