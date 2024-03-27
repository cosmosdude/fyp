//
//  OvertimeStatusView.swift
//  fyp
//
//  Created by Thwin Htoo Aung on 24/3/24.
//

import UIKit

class OvertimeStatusView: NibView {
    
    @IBOutlet private var todayLabel: UILabel!
    var today: String {
        get { todayLabel.text ?? ""}
        set { todayLabel.text = newValue }
    }
    
    @IBOutlet private var weekLabel: UILabel!
    var week: String {
        get { weekLabel.text ?? ""}
        set { weekLabel.text = newValue }
    }
    
    @IBOutlet private var monthLabel: UILabel!
    var month: String {
        get { monthLabel.text ?? ""}
        set { monthLabel.text = newValue }
    }
    
}
