//
//  UIViewController+Ext.swift
//  fyp
//
//  Created by Thwin Htoo Aung on 22/3/24.
//

import Foundation
import UIKit

extension UIViewController {
    
    /// Pop nearest navigation controller.
    @objc func pop() {
        popNavigation(animated: true)
    }
    
    /// Pop nearest navigation controller.
    @objc func popNavigation(animated: Bool) {
        navigationController?.popViewController(animated: animated)
    }
    
}
