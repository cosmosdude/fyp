//
//  ISO8601DateFormatter+Ext.swift
//  fyp
//
//  Created by Thwin Htoo Aung on 24/3/24.
//

import Foundation

extension ISO8601DateFormatter {
    func with(formatOptions options: Options) -> Self {
        self.formatOptions = options
        return self
    }
    
    func adding(formatOptions options: Options) -> Self {
        self.formatOptions.insert(options)
        return self
    }
    
    func with(timeZone: TimeZone!) -> Self {
        self.timeZone = timeZone
        return self
    }
}
