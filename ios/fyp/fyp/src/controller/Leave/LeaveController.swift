//
//  LeaveController.swift
//  fyp
//
//  Created by Thwin Htoo Aung on 19/3/24.
//

import UIKit
import Combine

class LeaveController: UIViewController {

    @IBOutlet private(set) var leaveTypeListView: LeaveTypeListView!
    @IBOutlet private(set) var leaveRequestListView: MyLeaveRequestListView!
    
    let leaveTypesViewModel = LeaveTypeVM()
    var bag = Set<AnyCancellable>()
    
    override init(nibName nibNameOrNil: String?, bundle nibBundleOrNil: Bundle?) {
        super.init(nibName: nibNameOrNil, bundle: nibBundleOrNil)
        tabBarItem?.title = "Leave"
    }
    
    required init?(coder: NSCoder) {
        fatalError("init(coder:) has not been implemented")
    }
    
    override func viewDidLoad() {
        super.viewDidLoad()
        
        leaveTypesViewModel.$leaveTypes.receive(on: DispatchQueue.main)
            .sink { [weak self] in self?.leaveTypeListView.leaveTypes = $0 }
            .store(in: &bag)
        
        leaveTypesViewModel.$leaveRequests.receive(on: DispatchQueue.main)
            .sink { [weak self] in self?.leaveRequestListView.requests = $0 }
            .store(in: &bag)
        
        leaveTypesViewModel.fetchLeaveTypes()
        leaveTypesViewModel.fetchLeaveRequests()
    }
    
    override func viewDidAppear(_ animated: Bool) {
        super.viewDidAppear(animated)
        leaveTypesViewModel.fetchLeaveTypes()
        leaveTypesViewModel.fetchLeaveRequests()
    }

}
