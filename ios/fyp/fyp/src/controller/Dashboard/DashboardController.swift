//
//  DashboardController.swift
//  fyp
//
//  Created by Thwin Htoo Aung on 19/3/24.
//

import UIKit
import Combine

class DashboardController: UIViewController {

    @IBOutlet private var avatar: Avatar!
    @IBOutlet private var nameLabel: UILabel!
    
    @IBOutlet private var attendanceStatusView: AttendanceStatusView!
    @IBOutlet private var teamListView: TeamListView!
    
    let userVM = UserVM()
    let teamVM = TeamVM()
    let attendanceVM = AttendanceVM()
    
    var bag = Set<AnyCancellable>()
    
    override func viewDidLoad() {
        super.viewDidLoad()
        
        userVM.$user.receive(on: DispatchQueue.main)
            .sink(receiveValue: { [weak self] in
                self?.avatar.render(name: $0?.fullName ?? "")
                self?.avatar.render(image: $0?.avatarURL)
            })
            .store(in: &bag)
        
        attendanceVM.$attendances.receive(on: DispatchQueue.main)
            .sink(receiveValue: { [weak self] in
                guard let attendance = $0.first else { return }
                self?.attendanceStatusView.render(attendance)
            })
            .store(in: &bag)
        
        teamVM.$teamMembers.receive(on: DispatchQueue.main)
            .sink(receiveValue: { [weak self] in
                self?.teamListView.team = $0
            })
            .store(in: &bag)
        
        attendanceVM.fetch()
        teamVM.fetch()
        userVM.fetchUser()
    }
    
    override func viewDidAppear(_ animated: Bool) {
        super.viewDidAppear(animated)
        teamVM.fetch()
        attendanceVM.fetch()
        userVM.fetchUser()
    }
    
    @IBAction
    private func didTapRequestAttendance() {
        navigationController?.pushViewController(
            AttendanceRequestController(),
            animated: true
        )
    }
    
    @IBAction
    private func didTapAttendanceHistory() {
        navigationController?.pushViewController(
            AttendanceController(),
            animated: true
        )
    }
    
    @IBAction
    private func didTapRequestOvertime() {
        navigationController?.pushViewController(
            OvertimeRequestController(),
            animated: true
        )
    }
    
    @IBAction
    private func didTapOvertimeHistory() {
        navigationController?.pushViewController(
            OvertimeController(),
            animated: true
        )
    }
}
