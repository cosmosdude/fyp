//
//  Manager.swift
//  fyp
//
//  Created by Thwin Htoo Aung on 22/3/24.
//

import Foundation
import TANetworking

@dynamicMemberLookup
struct Manager: NetworkTypeProxy {
    
    let value: ManagerUserData
    
    init(_ value: ManagerUserData) { self.value = value }
    
    var fullName: String {
        [self.firstName, self.lastName].compactMap {$0}.joined(separator: " ")
    }
    
    /// Manager's Avatar URL
    var avatarURL: URL? {
        URL(string: Api.route(self.avatarPath ?? ""))
    }
    
    var position: String {
        [self.designation, self.department]
            .compactMap{$0}
            .joined(separator: " of ")
    }
    
}
