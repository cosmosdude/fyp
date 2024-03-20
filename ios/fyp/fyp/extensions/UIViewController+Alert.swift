//
//  UIViewController+Alert.swift
//  fyp
//
//  Created by Thwin Htoo Aung on 19/3/24.
//

import Foundation
import UIKit

extension UIViewController {
    
    @MainActor
    func presentAlert(
        title: String?, message: String? = nil,
        preferredStyle: UIAlertController.Style = .alert,
        actions: [UIAlertAction] = []
    ) {
        let alert = UIAlertController(
            title: title,
            message: message,
            preferredStyle: preferredStyle
        )
        
        actions.forEach(alert.addAction(_:))
        
        if (actions.isEmpty) {
            alert.addAction(UIAlertAction(title: "Dismiss", style: .cancel))
        }
        
        present(alert, animated: true)
    }
    
}
