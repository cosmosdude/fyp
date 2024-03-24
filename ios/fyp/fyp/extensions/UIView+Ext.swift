//
//  UILabel+Ext.swift
//  fyp
//
//  Created by Thwin Htoo Aung on 19/3/24.
//

import Foundation
import UIKit

public extension UIView {
    
    @objc
    var borderColor: UIColor? {
        get { layer.borderColor.flatMap(UIColor.init(cgColor:)) }
        set { layer.borderColor = newValue?.cgColor }
    }
    
    @objc
    var borderWidth: CGFloat {
        get { layer.borderWidth }
        set { layer.borderWidth = newValue }
    }
    
    @objc
    var cornerRadius: CGFloat {
        get { layer.cornerRadius } set { layer.cornerRadius = newValue }
    }
    
    @objc
    var borderRadius: CGFloat {
        get { layer.cornerRadius } set { layer.cornerRadius = newValue }
    }
    
    @objc
    var smoothCorners: Bool {
        get { layer.cornerCurve == .continuous }
        set { layer.cornerCurve = newValue ? .continuous : .circular }
    }
    
    @objc
    var shadowOffset: CGSize {
        get { layer.shadowOffset } set { layer.shadowOffset = newValue }
    }
    
    @objc
    var shadowOpacity: Float {
        get { layer.shadowOpacity } set { layer.shadowOpacity = newValue }
    }
    
    @objc
    var shadowRadius: CGFloat {
        get { layer.shadowRadius } set { layer.shadowRadius = newValue }
    }
    
    @objc
    var shadowColor: UIColor? {
        get { layer.shadowColor.map(UIColor.init(cgColor:)) }
        set { layer.shadowColor = newValue?.cgColor }
    }
    
}
