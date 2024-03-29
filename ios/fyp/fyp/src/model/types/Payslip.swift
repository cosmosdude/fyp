//
//  Payslip.swift
//  fyp
//
//  Created by Thwin Htoo Aung on 29/3/24.
//

import Foundation
import TANetworking

public struct Payslip: NetworkTypeProxy {
    let value: PayslipData
    init(_ value: PayslipData) {
        self.value = value
        detail = .init(value.detail)
        items = value.items.map(PayslipItem.init)
    }
    
    let detail: PayslipDetail
    let items: [PayslipItem]
}

