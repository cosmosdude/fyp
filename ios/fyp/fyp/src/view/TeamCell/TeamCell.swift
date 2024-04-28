//
//  TeamCell.swift
//  fyp
//
//  Created by Thwin Htoo Aung on 24/3/24.
//

import UIKit

class TeamCell: NibTableViewCell {
    
    @IBOutlet private var avatar: Avatar!
    @IBOutlet private var nameLabel: UILabel!
    @IBOutlet private var positionLabel: UILabel!
    @IBOutlet private var statusLabel: UILabel!
    
    func render(_ member: TeamMember) {
        avatar.render(name: member.fullName)
        avatar.render(image: member.avatarURL)
        nameLabel.text = member.fullName
        positionLabel.text = member.position
        if (member.isHoliday) {
            statusLabel.text = "Holiday"
        } else if (member.isOnLeave) {
            statusLabel.text = "On Leave"
        } else if (member.startTime == nil) { // if start time is null, it's offday
            statusLabel.text = "Off"
        } else if (member.checkInTime == nil) {
            statusLabel.text = "Not Arrived"
        } else {
            let checkInTime = member.checkInTime ?? Date()
            let start = member.startTime ?? Date()
            statusLabel.text = checkInTime < start ? "On Time": "Late"
        }
        
        let text = statusLabel.text ?? ""
        statusLabel.textColor = UIColor(
            named: text == "On Time"
            ? "success-600"
            : text == "Late" ? "danger-600"
            : "neutral-600"
        )
    }
    
    override func setHighlighted(_ highlighted: Bool, animated: Bool) {
        super.setHighlighted(highlighted, animated: animated)
        UIView.animate(withDuration: 0.25) {
//            self.alpha = highlighted ? 0.25 : 1
            self.contentView.backgroundColor = UIColor(
                named: highlighted ? "primary-0" : "bg-0"
            )
        }
    }
    
}
