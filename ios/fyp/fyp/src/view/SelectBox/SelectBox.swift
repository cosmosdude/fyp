//
//  SelectBox.swift
//  fyp
//
//  Created by Thwin Htoo Aung on 22/3/24.
//

import UIKit
import Kingfisher

class SelectBox: NibControl {
    
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
    
    func setImageURL(_ url: URL?) {
        leftImage.kf.setImage(
            with: url,
            placeholder: UIImage(systemName: "person.circle.fill")) {
                _ in
//                [weak self] in
//                switch $0 {
//                case .success: ()
//                case .failure:
//                    self?.leftImage.image = UIImage(systemName: "person.circle.fill")
//                }
            }
        leftImage.isHidden = false
    }
    
//    @IBInspectable
//    var imageURL: URL? {
//        get { leftImage.image }
//        set {
//            leftImage.image = newValue
//            leftImage.isHidden = newValue == nil
//        }
//    }
    
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
    
    @IBAction
    private func didTap() {
        sendActions(for: .touchUpInside)
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
