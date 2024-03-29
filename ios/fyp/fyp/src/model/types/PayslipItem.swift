//
//  PayslipItem.swift
//  fyp
//
//  Created by Thwin Htoo Aung on 29/3/24.
//

import Foundation
import TANetworking

public struct PayslipItem: NetworkTypeProxy {
    let value: PayslipItemData
    init(_ value: PayslipItemData) {
        self.value = value
    }
    
    enum Kind: String {
        case allowance
        case deduction
    }
    
    var kind: Kind {
        Kind(rawValue: value.type) ?? .allowance
    }
    
    var isRelative: Bool {
        value.relativeAmount != 0
    }
}
