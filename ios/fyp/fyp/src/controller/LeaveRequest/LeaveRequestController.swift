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
    
    let fromDateVM = DateVM()
    let toDateVM = DateVM()
    let leaveVM = LeaveVM()
    let managerVM = ManagerVM()
    
    override func viewDidLoad() {
        super.viewDidLoad()
        navBar.backArrowBtn.addTarget(
            self, action: #selector(self.pop), for: .touchUpInside
        )
        
        fromDateVM.$dateText.receive(on: DispatchQueue.main)
            .sink { [weak box = fromDateSelectBox] in
                box?.text = $0 ?? "Select date"
            }.store(in: &bag)
        
        toDateVM.$dateText.receive(on: DispatchQueue.main)
            .sink { [weak box = toDateSelectBox] in
                box?.text = $0 ?? "Select date"
            }.store(in: &bag)
        
        leaveVM.$selectedLeaveType.receive(on: DispatchQueue.main)
            .sink { [weak leaveBox = leaveSelectBox] in
                guard let leave = $0 else { return }
                leaveBox?.text = "\(leave.name) - \(leave.balance) day(s)"
                
            }.store(in: &bag)
        
        managerVM.$selectedManager.receive(on: DispatchQueue.main)
            .sink { [weak self] in
                guard let manager = $0 else { return }
                self?.managerSelectBox.setImageURL(manager.avatarURL)
                self?.managerSelectBox.text = manager.fullName
                
            }.store(in: &bag)
        
        leaveVM.fetchLeaveTypes()
        managerVM.fetchManagers()
    }
    
    @IBAction
    private func didTapFromDate() {
        let picker = DateSelectionController()
        picker.didSelectDate = { [weak fromDateVM] in
            fromDateVM?.date = $0
        }
        present(picker, animated: true)
    }
    
    @IBAction
    private func didTapToDate() {
        let picker = DateSelectionController()
        picker.didSelectDate = { [weak toDateVM] in
            toDateVM?.date = $0
        }
        present(picker, animated: true)
    }
    
    @IBAction
    private func didTapLeave() {
        let picker = SelectionController(
            items: leaveVM.leaveTypes.map { "\($0.name) - \($0.balance) day(s)" },
            selected: nil
        )
        picker.didSelectItemAt = {
            [weak self] index in
            self?.leaveVM.selectedLeaveTypeIndex = index.row
        }
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
