//
//  AttendanceRequestController.swift
//  fyp
//
//  Created by Thwin Htoo Aung on 24/3/24.
//

import UIKit
import Combine
import CoreLocation

class AttendanceRequestController: UIViewController {

    let locationManager = CLLocationManager()
    
    @IBOutlet private var navBar: NavBarView!
    
    @IBOutlet private var requestTo: SelectBox!
    let managerVM = ManagerVM()
    
    @IBOutlet private var date: SelectBox!
    let dateVM = DateVM()
    
    @IBOutlet private var time: SelectBox!
    let timeVM = DateVM()
    
    @IBOutlet private var type: SelectBox!
    let typeVM = OptionsVM<String>()
    
    @IBOutlet private var map: CurrentLocationView!
    
    @IBOutlet private var reason: TextBox!
    
    @IBOutlet private var spinner: UIActivityIndicatorView!
    @IBOutlet private var request: UIButton!
    let requestVM = RequestAttendanceVM()
    
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
        
        
        dateVM.$displayText.receive(on: DispatchQueue.main)
            .sink { [weak self] in
                self?.date.text = $0 ?? "Select Date"
            }.store(in: &bag)
        
        
        timeVM.$displayText.receive(on: DispatchQueue.main)
            .sink { [weak self] in
                self?.time.text = $0 ?? "Select Time"
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
        
        timeVM.displayFormat = "hh:mm a"
        dateVM.date = Date()
        timeVM.date = Date()
        typeVM.options = [
            .init("Check In", "checkin"),
            .init("Check Out", "checkout")
        ]
        typeVM.index = 0
        
        managerVM.fetchManagers()
    }
    
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
        picker.didSelectDate = { [weak dateVM] in dateVM?.date = $0 }
        present(picker, animated: true)
    }
    
    @IBAction
    private func didTapTime() {
        let picker = DateSelectionController()
        picker.mode = .time
        picker.preferredStyle = .wheels
        picker.date = timeVM.date
        picker.didSelectDate = { [weak timeVM] in timeVM?.date = $0 }
        present(picker, animated: true)
    }
    
    @IBAction
    private func didTapType() {
        let picker = SelectionController(
            items: typeVM.options.map { $0.displayText },
            selected: typeVM.indexPath
        )
        picker.didSelectItemAt = {
            [weak self] in
            self?.typeVM.indexPath = $0
        }
        present(picker, animated: true)
    }
    
    @IBAction
    private func didTapRequest() {
        requestVM.request(.init(
            date: dateVM.date ?? Date(),
            time: timeVM.date ?? Date(),
            type: typeVM.option?.value ?? "checkin",
            coordinate: map.coordinate,
            recipientId: managerVM.selectedManager?.id ?? "",
            reason: reason.text
        ))
    }

}
