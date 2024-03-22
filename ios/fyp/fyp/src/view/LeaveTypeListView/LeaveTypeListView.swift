//
//  LeaveTypeListView.swift
//  fyp
//
//  Created by Thwin Htoo Aung on 22/3/24.
//

import UIKit

class LeaveTypeListView: UIView, NibLoadable {
    
    @IBOutlet private var listView: UICollectionView!
    private var flowLayout: UICollectionViewFlowLayout!
    
    var leaveTypes: [LeaveType] = [] {
        didSet { listView.reloadData() }
    }
    
    override init(frame: CGRect) {
        super.init(frame: frame)
        loadNibFile()
        setup()
    }
    
    required init?(coder: NSCoder) {
        super.init(coder: coder)
        loadNibFile()
        setup()
    }
    
    func setup() {
        listView.register(LeaveTypeListItemCell.self)
        flowLayout = listView.collectionViewLayout as? UICollectionViewFlowLayout
        flowLayout.estimatedItemSize = UICollectionViewFlowLayout.automaticSize
        flowLayout.minimumInteritemSpacing = 10
        flowLayout.sectionInset = .init(top: 0, left: 20, bottom: 0, right: 20)
        listView.delegate = self
        listView.dataSource = self
    }
    
}

extension LeaveTypeListView: UICollectionViewDelegate {
    
}

extension LeaveTypeListView: UICollectionViewDelegateFlowLayout {
    
    func collectionView(
        _ collectionView: UICollectionView,
        layout collectionViewLayout: UICollectionViewLayout,
        minimumInteritemSpacingForSectionAt section: Int
    ) -> CGFloat { 10 }
    
    func collectionView(
        _ collectionView: UICollectionView,
        layout collectionViewLayout: UICollectionViewLayout,
        minimumLineSpacingForSectionAt section: Int
    ) -> CGFloat { 10 }
    
//    func collectionView(
//        _ collectionView: UICollectionView,
//        layout collectionViewLayout: UICollectionViewLayout,
//        sizeForItemAt indexPath: IndexPath
//    ) -> CGSize {
//        
//    }
    
}

extension LeaveTypeListView: UICollectionViewDataSource {
    func collectionView(_ collectionView: UICollectionView, numberOfItemsInSection section: Int) -> Int {
        leaveTypes.count
    }
    func collectionView(_ collectionView: UICollectionView, cellForItemAt indexPath: IndexPath) -> UICollectionViewCell {
        let cell = listView.dequeueReusableCell(
            LeaveTypeListItemCell.self, for: indexPath
        )
        let item = leaveTypes[indexPath.row]
        
        let balance = String(format: "%.1f day(s)", item.balance)
//        balance
        
        cell.titleLabel.text = balance.replacingOccurrences(of: ".0", with: "")
        cell.subtitleLabel.text = item.name
        return cell
    }
}
