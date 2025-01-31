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
            nibName: NSStringFromClass(type(of: self))
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
    func didLoadNibFile()
    
}

extension NibLoadable {
    
    var nibContainerView: UIView! { self }
    
    func loadNibFile() {
        guard let nib else { return }
        
        nib.instantiate(withOwner: self)
            .compactMap { $0 as? UIView }
            .reversed()
            .forEach(stickToMargins(view:))
        
        didLoadNibFile()
    }
    
    private func stickToMargins(view: UIView) {
        view.translatesAutoresizingMaskIntoConstraints = false
        guard let nibContainerView else { return }
        nibContainerView.addSubview(view)
        nibContainerView.sendSubviewToBack(view)
        NSLayoutConstraint.activate([
            view.topAnchor.constraint(equalTo: nibContainerView.topAnchor),
            view.bottomAnchor.constraint(equalTo: nibContainerView.bottomAnchor),
            view.rightAnchor.constraint(equalTo: nibContainerView.rightAnchor),
            view.leftAnchor.constraint(equalTo: nibContainerView.leftAnchor),
        ])
    }
    
}



class NibView: UIView, NibLoadable {
    
    override init(frame: CGRect) {
        super.init(frame: frame)
        loadNibFile()
    }
    
    required init?(coder: NSCoder) {
        super.init(coder: coder)
        loadNibFile()
    }
    
    func didLoadNibFile() { }
}

class NibControl: UIControl, NibLoadable {
    
    override init(frame: CGRect) {
        super.init(frame: frame)
        loadNibFile()
    }
    
    required init?(coder: NSCoder) {
        super.init(coder: coder)
        loadNibFile()
    }
    
    func didLoadNibFile() { }
    
}

class NibTableViewCell: UITableViewCell, NibLoadable {
    
    var nibContainerView: UIView! { contentView }
    
    override init(style: UITableViewCell.CellStyle, reuseIdentifier: String?) {
        super.init(style: style, reuseIdentifier: reuseIdentifier)
        loadNibFile()
    }
    
    required init?(coder: NSCoder) {
        super.init(coder: coder)
        loadNibFile()
    }
    
    func didLoadNibFile() { }
}

class NibTableViewHeaderFooterView: UITableViewHeaderFooterView, NibLoadable {
    
    var nibContainerView: UIView! { contentView }
    
    override init(reuseIdentifier: String?) {
        super.init(reuseIdentifier: reuseIdentifier)
        loadNibFile()
    }
    
    required init?(coder: NSCoder) {
        super.init(coder: coder)
        loadNibFile()
    }
    
    func didLoadNibFile() { }
}

class NibCollectionViewCell: UICollectionViewCell, NibLoadable {
    
    var nibContainerView: UIView! { contentView }
    
    override init(frame: CGRect) {
        super.init(frame: frame)
        loadNibFile()
    }
    
    required init?(coder: NSCoder) {
        super.init(coder: coder)
        loadNibFile()
    }
    
    func didLoadNibFile() { }
}
