//
//  ManagerSelectionCell.swift
//  fyp
//
//  Created by Thwin Htoo Aung on 22/3/24.
//

import UIKit

class ManagerSelectionCell: NibTableViewCell {
    
    @IBOutlet private(set) var avatar: Avatar!
    @IBOutlet private(set) var titleLabel: UILabel!
    @IBOutlet private(set) var subtitleLabel: UILabel!
    @IBOutlet private(set) var checkmark: UIImageView!
    
    func renderSelected(_ flag: Bool) {
        checkmark.isHidden = !flag
    }
    
    func render(manager: Manager) {
        avatar.render(name: manager.fullName)
        avatar.render(image: manager.avatarURL)
        titleLabel.text = manager.fullName
        subtitleLabel.text = manager.position
    }
    
    override func setHighlighted(_ highlighted: Bool, animated: Bool) {
        super.setHighlighted(highlighted, animated: animated)
        UIView.animate(withDuration: 0.25) {
            self.alpha = highlighted ? 0.25 : 1
        }
    }
    
}
