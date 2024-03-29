//
//  PayslipItemTableHeader.swift
//  fyp
//
//  Created by Thwin Htoo Aung on 29/3/24.
//

import UIKit

class PayslipItemTableHeader: NibTableViewHeaderFooterView {
    
    @IBOutlet private var titleLabel: UILabel!
    
    var title: String {
        get { titleLabel.text ?? "" }
        set { titleLabel.text = newValue }
    }
    
}

