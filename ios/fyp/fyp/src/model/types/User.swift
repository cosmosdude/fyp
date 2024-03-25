//
//  User.swift
//  fyp
//
//  Created by Thwin Htoo Aung on 25/3/24.
//

import Foundation
import TANetworking

struct User: NetworkTypeProxy {
    let value: UserData
    
    init(_ value: UserData) {
        self.value = value
    }
    
    var avatarURL: URL? {
        value.avatarPath.map(Api.route).flatMap(URL.init(string:))
    }
    
    var fullName: String {
        return [value.firstName, value.lastName]
            .compactMap{$0}
            .joined(separator: " ")
    }
}
