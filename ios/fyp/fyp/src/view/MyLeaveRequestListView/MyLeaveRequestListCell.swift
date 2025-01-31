//
//  MyLeaveRequestListCell.swift
//  fyp
//
//  Created by Thwin Htoo Aung on 22/3/24.
//

import UIKit

class MyLeaveRequestListCell: NibTableViewCell {
    
    @IBOutlet private(set) var titleLabel: UILabel!
    @IBOutlet private(set) var subtitleLabel: UILabel!
    
    @IBOutlet private(set) var startView: DayView!
    @IBOutlet private(set) var arrow: UIView!
    @IBOutlet private(set) var endView: DayView!
    
    override func setHighlighted(_ highlighted: Bool, animated: Bool) {
        super.setHighlighted(highlighted, animated: animated)
        UIView.animate(withDuration: 0.25) {
            self.contentView.backgroundColor = UIColor(
                named: highlighted ? "primary-0" : "bg-0"
            )
        }
    }
}
