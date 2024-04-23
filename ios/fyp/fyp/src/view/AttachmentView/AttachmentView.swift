//
//  AttachmentView.swift
//  fyp
//
//  Created by Thwin Htoo Aung on 23/4/24.
//

import UIKit

class AttachmentView: NibView {

    @IBOutlet private var cv: UICollectionView!
    
    var images = [Image]() { didSet { cv.reloadData() } }
    
    var addAllowed = true { didSet { cv.reloadData() } }
    var deleteAllowed = true { didSet { cv.reloadData() } }
    
    override func didLoadNibFile() {
        super.didLoadNibFile()
        cv.register(AttachmentViewAddCell.self)
        cv.register(AttachmentViewImageCell.self)
    }
    
    var onAdd = {}
    var onDelete = {(_: Int) in}
    
}

extension AttachmentView: UICollectionViewDelegate {
    func collectionView(_ collectionView: UICollectionView, didSelectItemAt indexPath: IndexPath) {
        if (addAllowed) { onAdd() }
    }
}

extension AttachmentView: UICollectionViewDelegateFlowLayout {
    func collectionView(
        _ collectionView: UICollectionView,
        layout collectionViewLayout: UICollectionViewLayout,
        sizeForItemAt indexPath: IndexPath
    ) -> CGSize {
        .init(
            width: max(0, frame.height - (20)),
            height: max(0, frame.height - (20))
        )
    }
    
    func collectionView(_ collectionView: UICollectionView, layout collectionViewLayout: UICollectionViewLayout, insetForSectionAt section: Int) -> UIEdgeInsets {
        .init(top: 10, left: 0, bottom: 10, right: 0)
    }
    
    func collectionView(_ collectionView: UICollectionView, layout collectionViewLayout: UICollectionViewLayout, minimumInteritemSpacingForSectionAt section: Int) -> CGFloat {
        0
    }
}

extension AttachmentView: UICollectionViewDataSource {
    
    func collectionView(
        _ collectionView: UICollectionView,
        numberOfItemsInSection section: Int
    ) -> Int {
        return images.count + (addAllowed ? 1 : 0)
    }
    
    func collectionView(
        _ collectionView: UICollectionView,
        cellForItemAt indexPath: IndexPath
    ) -> UICollectionViewCell {
        if (addAllowed && indexPath.row == 0) {
            let cell = collectionView.dequeueReusableCell(
                AttachmentViewAddCell.self, for: indexPath
            )
            return cell
        } else {
            let cell = collectionView.dequeueReusableCell(
                AttachmentViewImageCell.self, for: indexPath
            )
            let image = getImage(indexPath)
            cell.render(image)
            cell.allowDelete(deleteAllowed)
            cell.onDelete = { [weak self, weak cv, weak cell] in
                guard let self, let cv, let cell else { return }
                guard let indexPath = cv.indexPath(for: cell) else { return }
                self.onDelete(self.getIndex(indexPath))
            }
            return cell
        }
    }
    
    private func getIndex(_ indexPath: IndexPath) -> Int {
        indexPath.row - (addAllowed ? 1 : 0)
    }
    
    private func getImage(_ indexPath: IndexPath) -> Image {
        images[getIndex(indexPath)]
    }
}
