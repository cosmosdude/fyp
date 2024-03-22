//
//  UICollectionView+Ext.swift
//  fyp
//
//  Created by Thwin Htoo Aung on 22/3/24.
//

import Foundation
import UIKit

extension UICollectionView {
    
    func register<T: UICollectionViewCell>(_ cellClass: T.Type) {
        register(
            cellClass,
            forCellWithReuseIdentifier: NSStringFromClass(cellClass)
        )
    }
    
    func dequeueReusableCell<T: UICollectionViewCell>(
        _ cellClass: T.Type, for indexPath: IndexPath
    ) -> T {
        dequeueReusableCell(
            withReuseIdentifier: NSStringFromClass(cellClass),
            for: indexPath
        ) as! T
    }
    
}
