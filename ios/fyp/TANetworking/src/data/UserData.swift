//
//  UserData.swift
//  TANetworking
//
//  Created by Thwin Htoo Aung on 19/3/24.
//

import Foundation

public struct UserData: Codable {
    public let insertId: Int?
    public let id: String
    public let username: String
    
    
    public let firstName: String?
    public let lastName: String?
    public let dob: String?
    public let gender: String?
    public let address: String?
    public let email: String?
    public let phone: String?
    
    public let emergencyName1: String?
    public let emergencyNumber1: String?
    public let emergencyRelation1: String?
    
    public let emergencyName2: String?
    public let emergencyNumber2: String?
    public let emergencyRelation2: String?
    
    public let status: String?
    
    public let roleID: String?
    public let roleName: String?
    
    public let createdAt: String?
    public let deletedAt: String?
    
    public let workEmail: String
    public let workPhone: String?
    
    public let departmentID: String?
    public let departmentName: String?
    
    public let designationID: String?
    public let designationName: String?
    
    public let avatarID: Int?
    public let avatarPath: String?
    
    public let employmentAgreementID: String?
    public let employmentAgreementPath: String?
    public let employmentAgreementFilename: String?
    
    public enum CodingKeys: String, CodingKey {
        case insertId = "insertId"
        case id
        
        case avatarPath = "avatar_path"
        case username
        
        case firstName = "first_name"
        case lastName = "last_name"
        case dob
        case gender
        case address
        case email
        case phone
        case status
        
        case workEmail = "work_email"
        case workPhone = "work_phone"
        case departmentName = "department_name"
        case designationName = "designation_name"
        
        case emergencyName1 = "emergency_name1"
        case emergencyNumber1 = "emergency_number1"
        case emergencyRelation1 = "emergency_relation1"
        
        case emergencyName2 = "emergency_name2"
        case emergencyNumber2 = "emergency_number2"
        case emergencyRelation2 = "emergency_relation2"
        
        
        case employmentAgreementPath = "employment_agreement_path"
        case employmentAgreementFilename = "employment_agreement_filename"
        
        
        case roleID = "role_id"
        case createdAt = "created_at"
        case deletedAt = "deleted_at"
        
        case departmentID = "department_id"
        case designationID = "designation_id"
        case avatarID = "avatar_id"
        case employmentAgreementID = "employment_agreement_id"
        
        case roleName = "role_name"
    }
}
