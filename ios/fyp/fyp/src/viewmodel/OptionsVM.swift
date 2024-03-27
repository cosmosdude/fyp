//
//  OptionsVM.swift
//  fyp
//
//  Created by Thwin Htoo Aung on 22/3/24.
//

import Foundation
import Combine

class OptionsVM<V> {
    
    class Option {
        let displayText: String
        let value: V
        
        init(_ displayText: String, _ value: V) {
            self.displayText = displayText
            self.value = value
        }
    }
    
    var options: [Option]
    
    /// Selected option. Default is null
    @Published private(set) var option: Option?
    
    var index: Int? {
        didSet {
            guard let index else { return option = nil }
            guard 0..<options.count ~= index else { return self.index = nil}
            option = options[index]
        }
    }
    
    /// Index Path with only row and 0 section
    var indexPath: IndexPath? {
        get { index.map{ IndexPath(row: $0, section: 0) } }
        set { index = newValue?.row }
    }
    
    init(options: [Option] = []) {
        self.options = options
    }
    
}
