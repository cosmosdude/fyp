//
//  DateFormatter+ext.swift
//  fyp
//
//  Created by Thwin Htoo Aung on 23/3/24.
//

import Foundation

extension DateFormatter {
    
    func with(dateFormat: String!) -> Self {
        self.dateFormat = dateFormat
        return self
    }
    
}
