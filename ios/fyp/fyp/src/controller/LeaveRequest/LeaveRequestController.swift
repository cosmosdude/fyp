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
    @IBOutlet private var typeSelectBox: SelectBox!
    @IBOutlet private var managerSelectBox: SelectBox!
    @IBOutlet private var reasonTextBox: TextBox!
    
    @IBOutlet private var spinner: UIActivityIndicatorView!
    @IBOutlet private var btn: UIButton!
    
    private var bag = Set<AnyCancellable>()
    
    let fromDateVM = DateVM()
    let toDateVM = DateVM()
    let leaveVM = LeaveVM()
    let typeVM = OptionsVM(options: [
        .init("Entire Day", ""),
        .init("Morning (AM)", "am"),
        .init("Evening (PM)", "pm")
    ])
    let managerVM = ManagerVM()
    
    let requestVM = RequestLeaveVM()
    
    func render(spinner flag: Bool) {
        btn.isHidden = flag
        spinner.isHidden = !flag
    }
    
    override func viewDidLoad() {
        super.viewDidLoad()
        navBar.backArrowBtn.addTarget(
            self, action: #selector(self.pop), for: .touchUpInside
        )
        
        requestVM.$status.receive(on: DispatchQueue.main)
            .sink { [weak self] in
                switch $0 {
                case .processing:
                    self?.render(spinner: true)
                case .success:
                    self?.render(spinner: false)
                    self?.pop()
                case .failure(let error):
                    self?.render(spinner: false)
                    self?.presentAlert(
                        title: "Error",
                        message: error
                    )
                case nil: ()
                }
            }.store(in: &bag)
        
        leaveVM.$selectedLeaveType.receive(on: DispatchQueue.main)
            .sink { [weak leaveBox = leaveSelectBox] in
                guard let leave = $0 else { return }
                leaveBox?.text = "\(leave.name) - \(leave.balance) day(s)"
            }.store(in: &bag)
        
        fromDateVM.$displayText.receive(on: DispatchQueue.main)
            .sink { [weak box = fromDateSelectBox] in
                box?.text = $0 ?? "Select date"
            }.store(in: &bag)
        
        toDateVM.$displayText.receive(on: DispatchQueue.main)
            .sink { [weak box = toDateSelectBox] in
                box?.text = $0 ?? "Select date"
            }.store(in: &bag)
        
        typeVM.$option.receive(on: DispatchQueue.main)
            .sink { [weak box = typeSelectBox] in
                box?.text = $0?.displayText ?? "Entire Day"
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
        picker.date = fromDateVM.date
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
            selected: leaveVM.selectedLeaveTypeIndex.map{IndexPath(row: $0, section: 0)}
        )
        picker.didSelectItemAt = {
            [weak self] index in
            self?.leaveVM.selectedLeaveTypeIndex = index.row
        }
        present(picker, animated: true)
    }
    
    @IBAction
    private func didTapType() {
        let picker = SelectionController(
            items: typeVM.options.map { $0.displayText },
            selected: typeVM.index.map { IndexPath(row: $0, section: 0) }
        )
        picker.didSelectItemAt = {
            [weak self] index in
            self?.typeVM.index = index.row
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
    
    @IBAction
    private func didTapRequest() {
        requestVM.request(request: .init(
            leaveId: leaveVM.selectedLeaveType?.id ?? "",
            from: fromDateVM.date ?? Date(),
            to: toDateVM.date ?? Date(),
            recipientId: managerVM.selectedManager?.id ?? "",
            type: typeVM.option?.value ?? "",
            reason: reasonTextBox.text ?? ""
        ))
    }
    
}
