//
//  NibLoadable.swift
//  fyp
//
//  Created by Thwin Htoo Aung on 19/3/24.
//

import Foundation
import UIKit

protocol NibProvider: NSObjectProtocol {
    var nib: UINib? { get }
}

extension NibProvider {
    
    var nib: UINib? {
        return UINib(
            nibName: NSStringFromClass(Self.self)
                .split(separator: ".")
                .map(String.init)
                .last ?? "",
            bundle: Bundle(for: Self.self)
        )
    }
    
}

protocol NibLoadable: UIView, NibProvider {
    
    var nibContainerView: UIView! { get }
    
    func loadNibFile()
    
}

extension NibLoadable {
    
    var nibContainerView: UIView! { self }
    
    func loadNibFile() {
        guard let nib else { return }
        
        nib.instantiate(withOwner: self)
            .compactMap { $0 as? UIView }
            .forEach(stickToMargins(view:))
    }
    
    private func stickToMargins(view: UIView) {
        view.translatesAutoresizingMaskIntoConstraints = false
        guard let nibContainerView else { return }
        nibContainerView.addSubview(view)
        NSLayoutConstraint.activate([
            view.topAnchor.constraint(equalTo: nibContainerView.topAnchor),
            view.bottomAnchor.constraint(equalTo: nibContainerView.bottomAnchor),
            view.rightAnchor.constraint(equalTo: nibContainerView.rightAnchor),
            view.leftAnchor.constraint(equalTo: nibContainerView.leftAnchor),
        ])
    }
    
}



final class SampleNibLoadableCell: UIView, NibLoadable {
    
    override init(frame: CGRect) {
        super.init(frame: frame)
        loadNibFile()
    }
    
    required init?(coder: NSCoder) {
        super.init(coder: coder)
        loadNibFile()
    }
    
}
