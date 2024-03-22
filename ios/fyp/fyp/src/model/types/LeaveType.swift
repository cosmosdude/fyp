//
//  LeaveType.swift
//  fyp
//
//  Created by Thwin Htoo Aung on 22/3/24.
//

import Foundation
import TANetworking

struct LeaveType: NetworkTypeProxy {
    
    init(_ value: TANetworking.LeaveBalanceData) {
        self.value = value
    }
    
    let value: LeaveBalanceData
}
