//
//  DayView.swift
//  fyp
//
//  Created by Thwin Htoo Aung on 22/3/24.
//

import UIKit

class DayView: NibView {
    
    @IBOutlet private(set) var titleLabel: UILabel!
    @IBOutlet private(set) var subtitleLabel: UILabel!
    
    let dayF = DateFormatter().with(dateFormat: "d")
    let monthF = DateFormatter().with(dateFormat: "MMM")
    
    func setDate(_ date: Date?) {
        titleLabel.text = date.map(dayF.string(from:)) ?? "-"
        subtitleLabel.text = date.map(monthF.string(from:)) ?? "-"
    }
    
//    override init(frame: CGRect) {
//        super.init(frame: frame)
//        loadNibFile()
//    }
//    
//    required init?(coder: NSCoder) {
//        super.init(coder: coder)
//        loadNibFile()
//    }
    
}
