//
//  DateVM.swift
//  fyp
//
//  Created by Thwin Htoo Aung on 22/3/24.
//

import Foundation

class DateVM {
    
    var date: Date? {
        didSet {
            guard let date else { return displayText = nil }
            displayText = displayFormatter.string(from: date)
        }
    }
    
    // MARK: Display
    @Published
    var displayText: String?
    
    var displayFormat: String? {
        get { displayFormatter.dateFormat ?? "" }
        set { displayFormatter.dateFormat = newValue }
    }
    
    let displayFormatter = DateFormatter()
    
    // MARK: Output
    var outputText: String? {
        date.map(outputFormatter.string(from:))
    }
    
    var outputFormat: String? {
        get { outputFormatter.dateFormat ?? "" }
        set { outputFormatter.dateFormat = newValue }
    }
    
    let outputFormatter = DateFormatter()
    
    init() {
        displayFormat = "d MMM, yyyy"
    }
    
}
