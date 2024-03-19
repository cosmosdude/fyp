//
//  UIApplication+Ext.swift
//  fyp
//
//  Created by Thwin Htoo Aung on 19/3/24.
//

import Foundation
import UIKit

extension UIApplication {
    
    var windowScene: UIWindowScene? {
        connectedScenes.compactMap { $0 as? UIWindowScene }.first
    }
    
}

extension UIWindow {
    
    func setRootViewController(
        _ controller: UIViewController?, animated: Bool = true
    ) {
        UIView.transition(with: self, duration: animated ? 0.25 : 0) {
            self.rootViewController = controller
        }
    }
    
}
