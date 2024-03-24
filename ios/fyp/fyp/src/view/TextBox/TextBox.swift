//
//  TextBox.swift
//  fyp
//
//  Created by Thwin Htoo Aung on 22/3/24.
//

import UIKit

class TextBox: NibView {
    
    @IBOutlet private var titleLabel: UILabel!
    @IBOutlet private var textView: UITextView!
    @IBOutlet private var container: UIView!
    @IBOutlet private var textBoxHeight: NSLayoutConstraint!
    @IBOutlet private var hMargins: [NSLayoutConstraint]!
    @IBOutlet private var vMargins: [NSLayoutConstraint]!
    
    @IBInspectable private var isReadOnly: Bool {
        // if not enabled, it is read only
        // otherwise, it is not read only
        get { !textBoxHeight.isActive }
        set {
            vMargins.forEach { $0.constant = newValue ? 0 : 5 }
            hMargins.forEach { $0.constant = newValue ? 0 : 10 }
            textBoxHeight.isActive = !newValue
            // enable editing if is not read only
            textView.isEditable = !newValue
            // enable scroll if is not read only
            textView.isScrollEnabled = !newValue
            
            container.borderWidth = newValue ? 0 : 1
        }
    }
    
    @IBInspectable
    var title: String? {
        get { titleLabel.text }
        set {
            titleLabel.text = newValue
            titleLabel.isHidden = newValue?.isEmpty ?? true
        }
    }
    
    @IBInspectable
    var text: String? {
        get { textView.text }
        set { textView.text = newValue }
    }
    
}
