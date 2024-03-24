//
//  OvertimeHistoryItemCell.swift
//  fyp
//
//  Created by Thwin Htoo Aung on 24/3/24.
//

import UIKit

class OvertimeHistoryItemCell: NibTableViewCell {
    
    @IBOutlet private(set) var dayView: DayView!
    @IBOutlet private(set) var titleLabel: UILabel!
    @IBOutlet private(set) var statusLabel: UILabel!
    
    override func didLoadNibFile() {
        dayView.setDate(Date())
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
