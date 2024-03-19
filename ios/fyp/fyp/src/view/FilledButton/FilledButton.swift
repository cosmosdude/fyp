//
//  FilledButton.swift
//  fyp
//
//  Created by Thwin Htoo Aung on 19/3/24.
//

import UIKit

class FilledButton: UIButton {
    
    override init(frame: CGRect) {
        super.init(frame: frame)
        setup()
    }
    
    required init?(coder: NSCoder) {
        super.init(coder: coder)
        setup()
    }
    
    private func setup() {
        titleLabel?.font = UIFont(name: "Inter-SemiBold", size: 14)
        backgroundColor = UIColor(named: "primary")
        setTitleColor(UIColor(named: "text-white"), for: .normal)
        cornerRadius = 6
        smoothCorners = true
    }
    
}
