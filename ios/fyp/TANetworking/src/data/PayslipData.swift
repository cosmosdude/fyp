//
//  PayslipData.swift
//  TANetworking
//
//  Created by Thwin Htoo Aung on 29/3/24.
//

import Foundation

public struct PayslipData: Codable {
    public let detail: PayslipDetailData
    public let items: [PayslipItemData]
}
