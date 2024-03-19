//
//  UILabel+Ext.swift
//  fyp
//
//  Created by Thwin Htoo Aung on 19/3/24.
//

import Foundation
import UIKit

public extension UIView {
    
    @IBInspectable
    var borderColor: UIColor? {
        get { layer.borderColor.flatMap(UIColor.init(cgColor:)) }
        set { layer.borderColor = newValue?.cgColor }
    }
    
    @IBInspectable
    var borderWidth: CGFloat {
        get { layer.borderWidth }
        set { layer.borderWidth = newValue }
    }
    
    @IBInspectable
    var cornerRadius: CGFloat {
        get { layer.cornerRadius }
        set { layer.cornerRadius = newValue }
    }
    
    @IBInspectable
    var smoothCorners: Bool {
        get { layer.cornerCurve == .continuous }
        set { layer.cornerCurve = newValue ? .continuous : .circular }
    }
    
}
