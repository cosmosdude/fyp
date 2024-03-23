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
            }.store(in: &bag)
        tableView.register(NotificationCell.self)
        tableView.delegate = self
        tableView.dataSource = self
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
