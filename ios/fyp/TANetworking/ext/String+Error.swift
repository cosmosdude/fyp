//
//  String+Error.swift
//  fyp
//
//  Created by Thwin Htoo Aung on 19/3/24.
//

import Foundation

extension String: LocalizedError {
    public var errorDescription: String? { self }
}
