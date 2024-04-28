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
    @IBOutlet private var overtimeView: OvertimeStatusView!
    @IBOutlet private var teamListView: TeamListView!
    
    let userVM = UserVM()
    let teamVM = TeamVM()
    let attendanceVM = AttendanceVM()
    let otVM = MyOTVM()
    
    var bag = Set<AnyCancellable>()
    
    override func viewDidLoad() {
        super.viewDidLoad()
        
        userVM.$user.receive(on: DispatchQueue.main)
            .sink(receiveValue: { [weak self] in
                self?.avatar.render(name: $0?.fullName ?? "")
                self?.avatar.render(image: $0?.avatarURL)
                self?.nameLabel.text = $0?.fullName ?? ""
            })
            .store(in: &bag)
        
        attendanceVM.$attendances.receive(on: DispatchQueue.main)
            .sink(receiveValue: { [weak self] in
                guard let attendance = $0.first else { return }
                self?.attendanceStatusView.render(attendance)
            })
            .store(in: &bag)
        
        otVM.$ot.receive(on: DispatchQueue.main)
            .sink(receiveValue: { [weak self, weak vm = otVM] _ in
//                guard let attesceStatusView.render(attendance)
                let otv = self?.overtimeView
                otv?.today = vm?.today ?? "0 min"
                otv?.week = vm?.week ?? "0 min"
                otv?.month = vm?.month ?? "0 min"
                print("OT today", vm?.today ?? "")
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
        otVM.fetch()
        NotificationCenter.default.addObserver(
            self, selector: #selector(didReceiveNoti),
            name: .didReceiveRemoteNotification, object: nil
        )
        
        teamListView.onClick = { [weak self, weak navigationController, weak teamVM] index in
            guard let team = teamVM?.teamMembers else { return }
            let teamMember = team[index]
            let profile = ProfileController()
            profile.id = teamMember.id
            self?.navigationController?.pushViewController(
                profile,
                animated: true
            )
        }
    }
    
    @objc
    private func didReceiveNoti() {
        attendanceVM.fetch()
        teamVM.fetch()
        userVM.fetchUser()
        otVM.fetch()
    }
    
    override func viewDidAppear(_ animated: Bool) {
        super.viewDidAppear(animated)
        teamVM.fetch()
        attendanceVM.fetch()
        userVM.fetchUser()
        otVM.fetch()
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
