//
//  DashboardController.swift
//  fyp
//
//  Created by Thwin Htoo Aung on 19/3/24.
//

import UIKit
import Combine

class DashboardController: UIViewController {

    @IBOutlet private var teamListView: TeamListView!
    
    let teamVM = TeamVM()
    
    var bag = Set<AnyCancellable>()
    
    override func viewDidLoad() {
        super.viewDidLoad()
        teamVM.$teamMembers.receive(on: DispatchQueue.main)
            .sink(receiveValue: { [weak self] in
                self?.teamListView.team = $0
            })
            .store(in: &bag)
        teamVM.fetch()
    }
    
    override func viewDidAppear(_ animated: Bool) {
        super.viewDidAppear(animated)
        teamVM.fetch()
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
