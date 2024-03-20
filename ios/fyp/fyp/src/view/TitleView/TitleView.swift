//
//  TitleView.swift
//  fyp
//
//  Created by Thwin Htoo Aung on 20/3/24.
//

import UIKit

class TitleView: UIView, NibLoadable {

    @IBOutlet private var titleLabel: UILabel!
    @IBOutlet private var descLabel: UILabel!
    
    @IBInspectable var title: String? {
        get { titleLabel.text }
        set { titleLabel.text = newValue }
    }
    
    @IBInspectable var text: String? {
        get { descLabel.text }
        set { descLabel.text = newValue }
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
