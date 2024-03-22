//
//  SelectBox.swift
//  fyp
//
//  Created by Thwin Htoo Aung on 22/3/24.
//

import UIKit

class SelectBox: UIControl, NibLoadable {
    
    @IBOutlet private var actionOverlay: UIButton!
    
    @IBOutlet private var titleLabel: UILabel!
    @IBOutlet private var container: UIView!
    @IBOutlet private var leftImage: UIImageView!
    @IBOutlet private var textLabel: UILabel!
    @IBOutlet private var chevron: UIImageView!
    
    @IBInspectable private var isReadOnly: Bool {
        // if not enabled, it is read only
        // otherwise, it is not read only
        get { !actionOverlay.isEnabled }
        set {
            vMargins.forEach { $0.constant = newValue ? 0 : 6 }
            hMargins.forEach { $0.constant = newValue ? 0 : 10}
            actionOverlay.isEnabled = !newValue
            container.borderWidth = newValue ? 0 : 1
        }
    }
    
    @IBOutlet private var hMargins: [NSLayoutConstraint]!
    @IBOutlet private var vMargins: [NSLayoutConstraint]!
    
    @IBInspectable
    var image: UIImage? {
        get { leftImage.image }
        set {
            leftImage.image = newValue
            leftImage.isHidden = newValue == nil
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
        get { textLabel.text }
        set { textLabel.text = newValue }
    }
    
    @IBInspectable
    var isChevronHidden: Bool {
        get { chevron.isHidden }
        set { chevron.isHidden = newValue }
    }
    
    override init(frame: CGRect) {
        super.init(frame: frame)
        loadNibFile()
    }
    
    required init?(coder: NSCoder) {
        super.init(coder: coder)
        loadNibFile()
    }
    
}

final class __SelectBoxButton: UIButton {
    
    override var isHighlighted: Bool {
        didSet {
            UIView.animate(withDuration: 0.15) {
                self.backgroundColor = self.isHighlighted
                ? UIColor(named: "primary-0") : .clear
            }
        }
    }
    
}
