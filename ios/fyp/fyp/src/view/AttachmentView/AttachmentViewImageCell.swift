//
//  AttachmentViewImageCell.swift
//  fyp
//
//  Created by Thwin Htoo Aung on 23/4/24.
//

import UIKit
import Kingfisher

class AttachmentViewImageCell: NibCollectionViewCell {

    @IBOutlet private var imageView: UIImageView!
    @IBOutlet private var button: UIButton!
    
    /// Called upon deletion.
    var onDelete = { }
    
    func render(_ image: Image) {
        switch image {
        case .uiimage(let image): imageView.image = image
        case .url(let url): imageView.kf.setImage(with: url)
        }
    }
    
    func allowDelete(_ allowed: Bool) {
        button.isHidden = !allowed
    }
    
    @IBAction
    private func didTapDelete() {
        onDelete()
    }
    
    
}
