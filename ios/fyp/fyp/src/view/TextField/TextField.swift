//
//  THATextField.swift
//  fyp
//
//  Created by Thwin Htoo Aung on 19/3/24.
//

import UIKit

class TextField: UIControl, NibLoadable {
    
    @IBInspectable var title: String? {
        get { titleLabel.text }
        set { titleLabel.text = newValue }
    }
    
    @IBInspectable var leftIcon: UIImage? {
        get { leftIconBtn.image(for: .normal) }
        set {
            leftIconBtn.setImage(newValue, for: .normal)
            leftIconBtn.isHidden = newValue == nil
        }
    }
    
    @IBInspectable var leftIconInteractionEnabled: Bool {
        get { leftIconBtn.isUserInteractionEnabled }
        set { leftIconBtn.isUserInteractionEnabled = newValue }
    }
    
    @IBInspectable var text: String? {
        get { textField.text }
        set { textField.text = newValue }
    }
    
    @IBInspectable var placeholder: String? {
        get { textField.placeholder }
        set { textField.placeholder = newValue }
    }
    
    @IBInspectable var secureTextEntry: Bool = false {
        didSet {
            eyeIconBtn?.isHidden = !secureTextEntry
            textField.isSecureTextEntry = secureTextEntry
        }
    }
    
    @IBInspectable var rightIconInteractionEnabled: Bool {
        get { rightIconBtn.isUserInteractionEnabled }
        set { rightIconBtn.isUserInteractionEnabled = newValue }
    }
    
    @IBInspectable var rightIcon: UIImage? {
        get { rightIconBtn.image(for: .normal) }
        set {
            rightIconBtn.setImage(newValue, for: .normal)
            rightIconBtn.isHidden = newValue == nil
        }
    }
    
    @IBInspectable var borderHidden: Bool {
        get { containerView.layer.borderWidth == 0 }
        set { containerView.layer.borderWidth = newValue ? 0 : 1}
    }
    
    @IBInspectable private var isReadonly: Bool {
        // if not enabled, it is read only
        get { !textField.isUserInteractionEnabled }
        set {
            // if read only, remove paddings
            paddings.forEach { $0.constant = newValue ? 0 : 10 }
            // if not read only, enable text field
            textField.isUserInteractionEnabled = !newValue
        }
    }
    
    // MARK: Private
    @IBOutlet private var titleLabel: UILabel!
    
    @IBOutlet private var containerView: UIView!
    @IBOutlet private var paddings: [NSLayoutConstraint] = []
    
    @IBOutlet private var leftIconBtn: UIButton!
    @IBOutlet private var textField: UITextField!
    @IBOutlet private var eyeIconBtn: UIButton!
    @IBOutlet private var rightIconBtn: UIButton!
    
    @IBOutlet private var infoLabel: UILabel!
    
    override init(frame: CGRect) {
        super.init(frame: frame)
        loadNibFile()
        tintColor = UIColor(named: "text")
    }
    
    required init?(coder: NSCoder) {
        super.init(coder: coder)
        loadNibFile()
        tintColor = UIColor(named: "text")
    }
    
    @IBAction
    private func didTapEyeIcon(btn: UIButton) {
        textField.isSecureTextEntry.toggle()
        eyeIconBtn.setImage(
            UIImage(
                named: textField.isSecureTextEntry 
                ? "icon.eye"
                : "icon.eye-off"),
            for: .normal
        )
    }
    
}
