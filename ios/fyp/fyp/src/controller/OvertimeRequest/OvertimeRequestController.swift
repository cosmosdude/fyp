//
//  OvertimeRequestController.swift
//  fyp
//
//  Created by Thwin Htoo Aung on 24/3/24.
//

import UIKit
import Combine

class OvertimeRequestController: UIViewController {
    
    @IBOutlet private var navBar: NavBarView!
    
    @IBOutlet private var requestTo: SelectBox!
    let managerVM = ManagerVM()
    
    @IBOutlet private var date: SelectBox!
    let dateVM = DateVM()
    
    @IBOutlet private var duration: SelectBox!
    let durationVM = OptionsVM<Int>()
    
    @IBOutlet private var reason: TextBox!
    
    @IBOutlet private var spinner: UIActivityIndicatorView!
    @IBOutlet private var request: UIButton!
    let requestVM = RequestOvertimeVM()
    
    var bag = Set<AnyCancellable>()
    
    override func viewDidLoad() {
        super.viewDidLoad()
        navBar.backArrowBtn.addTarget(self, action: #selector(pop), for: .touchUpInside)
        // Do any additional setup after loading the view.
        managerVM.autoSelect = true
        managerVM.$selectedManager.receive(on: DispatchQueue.main)
            .sink { [weak self] in
                self?.requestTo.setImageURL($0?.avatarURL)
                self?.requestTo.text = $0?.fullName ?? "Select Manager"
            }.store(in: &bag)
        
        dateVM.date = Date()
        dateVM.$displayText.receive(on: DispatchQueue.main)
            .sink { [weak self] in
                self?.date.text = $0 ?? "Select Date"
            }.store(in: &bag)
        
        durationVM.$option.receive(on: DispatchQueue.main)
            .sink { [weak self] in
                self?.duration.text = $0?.displayText ?? "Select Duration"
            }.store(in: &bag)
        
        requestVM.$status.receive(on: DispatchQueue.main)
            .sink { [weak self] in
                self?.request.isHidden = $0?.isProcessing ?? false
                self?.spinner.isHidden = !($0?.isProcessing ?? false)
                
                switch $0 {
                case .success:
                    self?.pop()
                case .failure(let error):
                    self?.presentAlert(
                        title: "Error",
                        message: error
                    )
                default: ()
                }
            }.store(in: &bag)
        
        durationVM.options = [
            .init("15 mins", 15),
            .init("30 mins", 30),
            .init("45 mins", 45),
            .init("1 hr", 60),
            .init("1 hr 15 mins", (60 + 15)),
            .init("1 hr 30 mins", (60 + 30)),
            .init("1 hr 45 mins", (60 + 45)),
            .init("2 hr", (60 + 60)),
        ]
        durationVM.index = 0
        
        managerVM.fetchManagers()
    }


    /*
    // MARK: - Navigation

    // In a storyboard-based application, you will often want to do a little preparation before navigation
    override func prepare(for segue: UIStoryboardSegue, sender: Any?) {
        // Get the new view controller using segue.destination.
        // Pass the selected object to the new view controller.
    }
    */
    
    @IBAction
    private func didTapRequestTo() {
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
    private func didTapDate() {
        let picker = DateSelectionController()
        picker.date = dateVM.date
        picker.didSelectDate = { [weak dateVM] in
            dateVM?.date = $0
        }
        present(picker, animated: true)
    }
    
    @IBAction
    private func didTapDuration() {
        let picker = SelectionController(
            items: durationVM.options.map { $0.displayText },
            selected: durationVM.indexPath
        )
        picker.didSelectItemAt = {
            [weak self] index in
            self?.durationVM.index = index.row
        }
        present(picker, animated: true)
    }
    
    @IBAction
    private func didTapRequest() {
        requestVM.request(.init(
            date: dateVM.date ?? Date(),
            duration: durationVM.option?.value ?? (15 * 60),
            recipientId: managerVM.selectedManager?.id ?? "",
            reason: reason.text
        ))
    }

}
