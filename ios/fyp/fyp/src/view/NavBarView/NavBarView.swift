//
//  TitleView.swift
//  fyp
//
//  Created by Thwin Htoo Aung on 20/3/24.
//

import UIKit

class NavBarView: UIView, NibLoadable {

    @IBOutlet private var titleLabel: UILabel!
    @IBOutlet private(set) var backArrowBtn: UIButton!
    
    @IBInspectable var title: String? {
        get { titleLabel.text }
        set { titleLabel.text = newValue }
    }
    
    @IBInspectable var isBackArrowArrow: Bool {
        get { backArrowBtn.isHidden }
        set { backArrowBtn.isHidden = newValue }
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
