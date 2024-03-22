//
//  ManagerData.swift
//  TANetworking
//
//  Created by Thwin Htoo Aung on 22/3/24.
//

import Foundation

public struct ManagerUserData: Codable {
    public let id: String
    public let firstName: String
    public let lastName: String?
    public let avatarPath: String?
    public let department: String?
    public let designation: String?
    
    private enum CodingKeys: String, CodingKey {
        case id
        case firstName = "first_name"
        case lastName = "last_name"
        case avatarPath = "avatar_path"
        case department
        case designation
    }
}
