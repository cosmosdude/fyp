//
//  PayslipItemTableCell.swift
//  fyp
//
//  Created by Thwin Htoo Aung on 29/3/24.
//

import UIKit

class PayslipItemTableCell: NibTableViewCell {

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
    
    func render(title: String, subtitle: String) {
        titleLabel.text = title
        subtitleLabel.text = subtitle
    }
    
    func render(_ item: PayslipItem, salary: Double = 0) {
        titleLabel.text = item.name
        let amount = item.amount * (item.isRelative ? salary : 1)
        subtitleLabel.text = String(format: "%.f MMK", amount)
    }
    
    enum Style {
        case `default`, income, deduction
        
    }
    
    func render(style: Style) {
        switch style {
        case .income: subtitleLabel.textColor = UIColor(named: "success-600")
        case .deduction: subtitleLabel.textColor = UIColor(named: "danger-600")
        default: subtitleLabel.textColor = UIColor(named: "neutral-900")
        }
    }
}
