//
//  TableTitleHeader.swift
//  fyp
//
//  Created by Thwin Htoo Aung on 23/3/24.
//

import UIKit

class TableTitleHeader: NibTableViewHeaderFooterView {
    
    @IBOutlet private(set) var titleLabel: UILabel!
    
    override func didLoadNibFile() {
        backgroundView?.backgroundColor = .clear
    }
}
