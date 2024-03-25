//
//  AttendanceRecordCell.swift
//  fyp
//
//  Created by Thwin Htoo Aung on 25/3/24.
//

import UIKit

class AttendanceRecordCell: NibTableViewCell {
    
    @IBOutlet private var dayView: DayView!
    @IBOutlet private var statusView: AttendanceStatusView!
    
    func render(_ attendance: Attendance) {
        dayView.setDate(attendance.date)
        statusView.render(attendance)
    }
    
}
