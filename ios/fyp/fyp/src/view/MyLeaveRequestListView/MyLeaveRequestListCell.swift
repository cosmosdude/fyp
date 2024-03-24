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
    
}
