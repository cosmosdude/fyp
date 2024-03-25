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
    
    func with(timeZone: TimeZone!) -> Self {
        self.timeZone = timeZone
        return self
    }
    
    func with(locale: Locale!) -> Self {
        self.locale = locale
        return self
    }
}
