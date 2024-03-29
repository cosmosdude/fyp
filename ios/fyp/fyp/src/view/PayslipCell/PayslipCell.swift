//
//  PayslipCell.swift
//  fyp
//
//  Created by Thwin Htoo Aung on 29/3/24.
//

import UIKit

class PayslipCell: NibTableViewCell {

    @IBOutlet private var titleLabel: UILabel!
    @IBOutlet private var subtitleLabel: UILabel!
    
    let f = DateFormatter().with(dateFormat: "d MMM")
    
    func render(_ payslip: PayslipDetail) {
        titleLabel.text = payslip.name ?? "-"
        subtitleLabel.text = "\(payslip.from.map(f.string(from:)) ?? "") - \(payslip.to.map(f.string(from:)) ?? "")"
    }
    
    override func setHighlighted(_ highlighted: Bool, animated: Bool) {
        super.setHighlighted(highlighted, animated: animated)
        UIView.animate(withDuration: 0.25) {
            self.contentView.backgroundColor = UIColor(
                named: highlighted ? "primary-0" : "bg-0"
            )
        }
    }

}
