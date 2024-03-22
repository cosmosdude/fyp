//
//  Avatar.swift
//  fyp
//
//  Created by Thwin Htoo Aung on 22/3/24.
//

import UIKit
import Kingfisher

class Avatar: NibView {
    @IBOutlet private var label: UILabel!
    @IBOutlet private var imageView: UIImageView!
    
    func render(name: String) {
        label.text = name.split(separator: " ")
            .compactMap { $0.first.flatMap{String($0).capitalized} }
            .joined()
            
    }
    
    func render(image: URL?) {
        imageView.kf.setImage(with: image)
    }
}
