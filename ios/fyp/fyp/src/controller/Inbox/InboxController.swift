//
//  InboxController.swift
//  fyp
//
//  Created by Thwin Htoo Aung on 19/3/24.
//

import UIKit
import Combine

class InboxController: UIViewController {

    let notiViewModel = NotificationVM()
    
    var bag = Set<AnyCancellable>()
    
    @IBOutlet private var tableView: UITableView!
    @IBOutlet private var emptyView: EmptyView!
    private let refresh = UIRefreshControl()
    
    override init(nibName nibNameOrNil: String?, bundle nibBundleOrNil: Bundle?) {
        super.init(nibName: nibNameOrNil, bundle: nibBundleOrNil)
        tabBarItem?.title = "Inbox"
    }
    
    required init?(coder: NSCoder) {
        fatalError("init(coder:) has not been implemented")
    }
    
    override func viewDidLoad() {
        super.viewDidLoad()
        notiViewModel.$notifications.receive(on: DispatchQueue.main)
            .sink { [weak self] in
                print("Notifications", $0)
                self?.tableView.reloadData()
                self?.emptyView.isHidden = !$0.isEmpty
            }.store(in: &bag)
        
        notiViewModel.$status.receive(on: DispatchQueue.main)
            .sink { [weak self] in
                ($0?.isProcessing ?? false)
                ? self?.refresh.beginRefreshing()
                : self?.refresh.endRefreshing()
            }.store(in: &bag)
        
        tableView.register(NotificationCell.self)
        tableView.refreshControl = refresh
        tableView.delegate = self
        tableView.dataSource = self
        refresh.addTarget(self, action: #selector(didReceiveNoti), for: .valueChanged)
        
        NotificationCenter.default.addObserver(
            self, selector: #selector(didReceiveNoti),
            name: .didReceiveRemoteNotification, object: nil
        )
    }
    
    @objc
    private func didReceiveNoti() {
        refresh.beginRefreshing()
        notiViewModel.fetchNotifications()
    }
    
    override func viewDidAppear(_ animated: Bool) {
        super.viewDidAppear(animated)
        notiViewModel.fetchNotifications()
    }
    
}

extension InboxController: UITableViewDelegate {
    func tableView(_ tableView: UITableView, didSelectRowAt indexPath: IndexPath) {
        tableView.deselectRow(at: indexPath, animated: true)
        
        let noti = notiViewModel.notifications[indexPath.row]
        notiViewModel.read(at: indexPath.row)
        
        var controller: UIViewController?
        
        if (noti.type == .leaveRequest) {
            let vc = LeaveRequestDetailController()
            vc.leaveRequestID = noti.leaveRequestId ?? ""
            controller = vc
        }
        
        if (noti.type == .overtimeRequest) {
            let vc = OvertimeRequestDetailController()
            vc.id = noti.overtimeRequestId ?? ""
            controller = vc
        }
        
        if (noti.type == .attendanceRequest) {
            let vc = AttendanceRequestDetailController()
            vc.id = noti.attendanceRequestId ?? ""
            controller = vc
        }
        
        controller.map {
            navigationController?.pushViewController($0, animated: true)
        }
    }
}

extension InboxController: UITableViewDataSource {
    func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        notiViewModel.notifications.count
    }
    func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        let cell = tableView.dequeueReusableCell(
            NotificationCell.self, for: indexPath
        )
        let noti = notiViewModel.notifications[indexPath.row]
        cell.render(noti)
        return cell
    }
    
    
}
