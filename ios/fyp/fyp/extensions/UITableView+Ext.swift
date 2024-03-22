//
//  UITableView+Ext.swift
//  fyp
//
//  Created by Thwin Htoo Aung on 22/3/24.
//

import Foundation
import UIKit

extension UITableView {
    
    func register<T: UITableViewCell>(_ cellClass: T.Type) {
        register(
            cellClass,
            forCellReuseIdentifier: NSStringFromClass(cellClass)
        )
    }
    
    func dequeueReusableCell<T: UITableViewCell>(
        _ cellClass: T.Type, for indexPath: IndexPath
    ) -> T {
        dequeueReusableCell(
            withIdentifier: NSStringFromClass(cellClass),
            for: indexPath
        ) as! T
    }
    
}
