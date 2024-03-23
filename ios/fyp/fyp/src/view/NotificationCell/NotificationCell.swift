//
//  NotificationCell.swift
//  fyp
//
//  Created by Thwin Htoo Aung on 23/3/24.
//

import UIKit

class NotificationCell: NibTableViewCell {
    
    @IBOutlet private(set) var iconView: UIImageView!
    @IBOutlet private(set) var titleLabel: UILabel!
    @IBOutlet private(set) var bodyLabel: UILabel!
    @IBOutlet private(set) var dateLabel: UILabel!

    let calendar = Calendar(identifier: .gregorian)
    let dateF = DateFormatter().with(dateFormat: "d MMM, yyyy")
    let timeF = DateFormatter().with(dateFormat: "hh:mm a")
    
    func render(_ noti: Noti) {
        titleLabel.text = noti.title
        bodyLabel.text = noti.body
        
        var dateText: String = "Unknown"
        if let date = noti.createDate {
            if (calendar.isDateInToday(date)) {
                dateText = "Today \(timeF.string(from: date))"
            } else if (calendar.isDateInYesterday(date)) {
                dateText = "Yesterday"
            } else {
                dateText = dateF.string(from: date)
            }
        }
        
        dateLabel.text = dateText
    }
    
    override func setHighlighted(_ highlighted: Bool, animated: Bool) {
        super.setHighlighted(highlighted, animated: animated)
        UIView.animate(withDuration: 0.25) {
            self.alpha = highlighted ? 0.25 : 1
        }
    }
    
}
