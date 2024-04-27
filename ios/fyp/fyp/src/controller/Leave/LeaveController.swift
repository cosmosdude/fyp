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
    
    @IBOutlet private(set) var emptyView: EmptyView!
    
    let leaveViewModel = LeaveVM()
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
        
        leaveViewModel.$leaveTypes.receive(on: DispatchQueue.main)
            .sink { [weak self] in self?.leaveTypeListView.leaveTypes = $0 }
            .store(in: &bag)
        
        leaveViewModel.$leaveRequests.receive(on: DispatchQueue.main)
            .sink { [weak self] in
                self?.leaveRequestListView.requests = $0
                self?.emptyView.isHidden = !$0.isEmpty
            }
            .store(in: &bag)
        
        leaveViewModel.fetchLeaveTypes()
        leaveViewModel.fetchLeaveRequests()
        
        leaveRequestListView.didSelectItemAt = {
            [weak self, weak nav = navigationController] index in
            guard let leaveRequest = self?.leaveViewModel.leaveRequests[index.row]
            else { return }
            
            let detail = LeaveRequestDetailController()
            detail.leaveRequestID = leaveRequest.id
            nav?.pushViewController(
                detail, animated: true
            )
        }
        NotificationCenter.default.addObserver(
            self, selector: #selector(didReceiveNoti),
            name: .didReceiveRemoteNotification, object: nil
        )
    }
    
    @objc
    private func didReceiveNoti() {
        leaveViewModel.fetchLeaveTypes()
        leaveViewModel.fetchLeaveRequests()
    }
    
    override func viewDidAppear(_ animated: Bool) {
        super.viewDidAppear(animated)
        leaveViewModel.fetchLeaveTypes()
        leaveViewModel.fetchLeaveRequests()
    }
    
    @IBAction
    private func didTapRequest() {
        navigationController?.pushViewController(
            LeaveRequestController(), animated: true
        )
    }

}
