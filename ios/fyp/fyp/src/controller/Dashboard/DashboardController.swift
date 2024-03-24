//
//  DashboardController.swift
//  fyp
//
//  Created by Thwin Htoo Aung on 19/3/24.
//

import UIKit

class DashboardController: UIViewController {

    @IBOutlet private var tableView: UITableView!

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
