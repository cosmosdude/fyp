//
//  EmptyView.swift
//  fyp
//
//  Created by Thwin Htoo Aung on 27/4/24.
//

import UIKit

class EmptyView: NibView {
    
    @IBOutlet private var imageView: UIImageView!
    @IBOutlet private var titleLabel: UILabel!
    @IBOutlet private var messageLabel: UILabel!
    
    @IBInspectable var image: UIImage? {
        set { imageView.image = newValue }
        get { imageView.image }
    }
    @IBInspectable var title: String? {
        set { titleLabel.text = newValue }
        get { titleLabel.text }
    }
    @IBInspectable var message: String? {
        set { messageLabel.text = newValue }
        get { messageLabel.text }
    }
    
}
