//
//  DateVM.swift
//  fyp
//
//  Created by Thwin Htoo Aung on 22/3/24.
//

import Foundation

class DateVM {
    
    @Published
    var dateText: String?
    
    var date: Date? {
        didSet {
            guard let date else { return dateText = nil }
            dateText = formatter.string(from: date)
        }
    }
    
    var format: String? {
        get { formatter.dateFormat ?? "" }
        set { formatter.dateFormat = newValue }
    }
    
    let formatter = DateFormatter()
    
    init() {
        format = "d MMM, yyyy"
    }
    
}
