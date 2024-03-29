//
//  PayslipItemTableFooter.swift
//  fyp
//
//  Created by Thwin Htoo Aung on 29/3/24.
//

import UIKit

class PayslipItemTableFooter: NibTableViewHeaderFooterView {

    @IBOutlet private var titleLabel: UILabel!
    @IBOutlet private var subtitleLabel: UILabel!
    
    var title: String {
        get { titleLabel.text ?? "" }
        set { titleLabel.text = newValue }
    }
    
    var subtitle: String {
        get { subtitleLabel.text ?? "" }
        set { subtitleLabel.text = newValue }
    }
    
}
