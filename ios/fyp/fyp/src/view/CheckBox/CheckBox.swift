//
//  CheckBox.swift
//  fyp
//
//  Created by Thwin Htoo Aung on 19/3/24.
//

import UIKit

class CheckBox: NibControl {

    @IBInspectable var isChecked: Bool {
        get { !(checkImage?.isHidden ?? true) }
        set {
            checkImage?.isHidden = !newValue
            checkArea.borderColor = UIColor(named: newValue ? "primary" : "border")
            checkArea.backgroundColor = UIColor(named: newValue ?  "primary" : "transparent")
        }
    }
    
    @IBInspectable var text: String? {
        get { label.text }
        set {
            label.text = newValue
            label.isHidden = newValue?.isEmpty ?? true
        }
    }
    
    @IBOutlet private var checkArea: UIView!
    @IBOutlet private var checkImage: UIImageView!
    @IBOutlet private var label: UILabel!
    
    
    @IBAction
    private func didTap() {
        UIView.animate(withDuration: 0.25) {
            self.isChecked.toggle()
        }
    }
    
}
