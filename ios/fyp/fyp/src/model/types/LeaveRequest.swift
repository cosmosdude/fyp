//
//  LeaveRequest.swift
//  fyp
//
//  Created by Thwin Htoo Aung on 22/3/24.
//

import Foundation
import TANetworking

@dynamicMemberLookup
struct LeaveRequest {
    
    private var data: LeaveRequestData
    
    init(_ data: LeaveRequestData) {
        self.data = data
    }
    
    subscript<T>(dynamicMember keyPath: KeyPath<LeaveRequestData, T>) -> T {
        get { data[keyPath: keyPath] }
    }
    
    static let f = {
        let f = DateFormatter()
        // 2024-03-21T17:19:56.000Z
        f.dateFormat = "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'"
        return f
    }()
    
    var from: Date? {
        return Self.f.date(from: self.fromDate)
    }
    
    var to: Date? {
        return Self.f.date(from: self.toDate)
    }
    
}
