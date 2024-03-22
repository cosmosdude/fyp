//
//  LeaveRequestController.swift
//  fyp
//
//  Created by Thwin Htoo Aung on 22/3/24.
//

import UIKit
import Combine

class LeaveRequestController: UIViewController {

    @IBOutlet private var navBar: NavBarView!
    @IBOutlet private var leaveSelectBox: SelectBox!
    @IBOutlet private var fromDateSelectBox: SelectBox!
    @IBOutlet private var toDateSelectBox: SelectBox!
    @IBOutlet private var managerSelectBox: SelectBox!
    
    private var bag = Set<AnyCancellable>()
    
    let managerVM = ManagerVM()
    
    override func viewDidLoad() {
        super.viewDidLoad()
        navBar.backArrowBtn.addTarget(
            self, action: #selector(self.pop), for: .touchUpInside
        )
        
        managerVM.$selectedManager.receive(on: DispatchQueue.main)
            .sink { [weak self] in
                guard let manager = $0 else { return }
                self?.managerSelectBox.setImageURL(manager.avatarURL)
                self?.managerSelectBox.text = manager.fullName
                
            }.store(in: &bag)
        
        managerVM.fetchManagers()
    }
    
    @IBAction
    private func didTapFromDate() {
        let picker = DateSelectionController()
        present(picker, animated: true)
    }
    
    @IBAction
    private func didTapToDate() {
        let picker = DateSelectionController()
        present(picker, animated: true)
    }
    
    @IBAction
    private func didTapLeave() {
        let picker = SelectionController()
        present(picker, animated: true)
    }
    
    @IBAction
    private func didTapManagers() {
        let selector = ManagerSelectionController(
            managers: managerVM.managers,
            selected: managerVM.selectedIndex
        )
        selector.didSelectManagerAt = {
            [weak self] index in
            self?.managerVM.selectedIndex = index
        }
        present(selector, animated: true)
    }
    
}
