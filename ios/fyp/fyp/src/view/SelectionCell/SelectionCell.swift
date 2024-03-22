//
//  SelectionCell.swift
//  fyp
//
//  Created by Thwin Htoo Aung on 22/3/24.
//

import UIKit

class SelectionCell: NibTableViewCell {
    
    @IBOutlet private(set) var label: UILabel!
    @IBOutlet private(set) var checkmark: UIImageView!
    
    func renderSelected(_ flag: Bool) {
        checkmark.alpha = flag ? 1 : 0
        label.textColor = UIColor(named: flag ? "primary": "text")
    }
    
    func render(label: String) {
        self.label.text = label
    }
    
    override func setHighlighted(_ highlighted: Bool, animated: Bool) {
        super.setHighlighted(highlighted, animated: animated)
        UIView.animate(withDuration: 0.25) {
            self.alpha = highlighted ? 0.25 : 1
        }
    }
    
}
