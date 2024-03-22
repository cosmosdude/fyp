//
//  FilledButton.swift
//  fyp
//
//  Created by Thwin Htoo Aung on 19/3/24.
//

import UIKit

class FilledButton: UIButton {
    
    var style: Style = .normal {
        didSet {  setupColor() }
    }
    
    // Interface Builder only
    @IBInspectable private var __style: String {
        get { style.rawValue }
        set { style = Style(rawValue: newValue) ?? .normal }
    }
    
    enum Style: String {
        case normal
        case destructive, danger
        case success
    }
    
    override init(frame: CGRect) {
        super.init(frame: frame)
        setup()
        
    }
    
    required init?(coder: NSCoder) {
        super.init(coder: coder)
        setup()
    }
    
    private func setup() {
        cornerRadius = 6
        smoothCorners = true
        titleLabel?.font = UIFont(name: "Inter-SemiBold", size: 14)
        setupColor()
    }
    
    private func setupColor() {
        switch style {
        case .normal:
            backgroundColor = UIColor(named: "primary")
        case .destructive, .danger:
            backgroundColor = UIColor(named: "danger-500")
        case .success:
            backgroundColor = UIColor(named: "success-600")
        }
        setTitleColor(UIColor(named: "text-white"), for: .normal)
    }
    
}
