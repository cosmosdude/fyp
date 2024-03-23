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
    
    func registerHeaderFooter<T: UITableViewHeaderFooterView>(_ viewClass: T.Type) {
        register(
            viewClass,
            forHeaderFooterViewReuseIdentifier: NSStringFromClass(viewClass)
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
    
    func dequeueHeaderFooter<T: UITableViewHeaderFooterView>(
        _ viewClass: T.Type
    ) -> T {
        dequeueReusableHeaderFooterView(
            withIdentifier: NSStringFromClass(viewClass)
        ) as! T
    }
    
}
