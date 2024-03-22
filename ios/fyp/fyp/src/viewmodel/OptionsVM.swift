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
    
    let options: [Option]
    
    /// Selected option. Default is null
    @Published private(set) var option: Option?
    
    var index: Int? {
        didSet {
            guard let index else { return option = nil }
            option = options[index]
        }
    }
    
    init(options: [Option]) {
        self.options = options
    }
    
}
