//
//  AttendanceStatusView.swift
//  fyp
//
//  Created by Thwin Htoo Aung on 24/3/24.
//

import UIKit

class AttendanceStatusView: NibView {
    
    @IBOutlet private var startLabel: UILabel!
    @IBOutlet private var titleLabel: UILabel!
    @IBOutlet private var endLabel: UILabel!
    
    @IBOutlet private var leftBar: UIView!
    @IBOutlet private var middleBar: UIView!
    @IBOutlet private var rightBar: UIView!
    
    @IBOutlet private var checkinLabel: UILabel!
    @IBOutlet private var statusLabel: UILabel!
    @IBOutlet private var checkoutLabel: UILabel!
    
    
    enum BarStyle {
        case none
        case good
        case bad
        
        var color: UIColor? {
            switch self {
            case .good: return UIColor(named: "success-600")
            case .bad: return UIColor(named: "danger-600")
            default: return UIColor(named: "text")
            }
        }
    }
    
    var startTime: String? {
        get { startLabel.text }
        set { startLabel.text = newValue }
    }
    
    var title: String? {
        get { titleLabel.text }
        set { titleLabel.text = newValue }
    }
    
    var endTime: String? {
        get { endLabel.text }
        set { endLabel.text = newValue }
    }
    
    var leftBarStyle: BarStyle = .none {
        didSet {
            let style = leftBarStyle
            leftBar.isHidden = style == .none
            leftBar.backgroundColor = style.color
            checkinLabel.textColor = style.color
        }
    }
    
    var rightBarStyle: BarStyle = .none {
        didSet {
            let style = rightBarStyle
            rightBar.isHidden = style == .none
            rightBar.backgroundColor = style.color
            checkoutLabel.textColor = style.color
        }
    }
    
    var checkinTime: String? {
        get { checkinLabel.text }
        set { checkinLabel.text = newValue }
    }
    
    var status: String? {
        get { statusLabel.text }
        set { statusLabel.text = newValue }
    }
    
    var checkoutTime: String? {
        get { checkoutLabel.text }
        set { checkoutLabel.text = newValue }
    }
    
    let dateF = DateFormatter()
        .with(dateFormat: "d MMM yyyy")
    
    let timeF = DateFormatter()
        .with(locale: Locale(identifier: "en_US_POSIX"))
        .with(dateFormat: "hh:mm a")
    
    func render(_ attendance: Attendance) {
        startTime = attendance.startTime.map(timeF.string(from:)) ?? ""
        endTime = attendance.endTime.map(timeF.string(from:)) ?? ""
        
        title = attendance.date.map(dateF.string(from:)) ?? ""
        
        checkinTime = " "
        checkoutTime = " "
        
        leftBarStyle = .none
        rightBarStyle = .none
        if (attendance.isHoliday) {
            statusLabel.text = attendance.holidayName ?? "Holiday"
        } else if (attendance.isOnLeave) {
            statusLabel.text = attendance.leaveName ?? "On Leave"
        } else if (attendance.isOff) {
            statusLabel.text = "Off Day"
        } else if let checkIn = attendance.checkInTime  {
            checkinTime = timeF.string(from: checkIn)
            leftBarStyle = checkIn > attendance.startTime! ? .bad : .good
            statusLabel.text = checkIn > attendance.startTime! ? "Late" : "On Time"

            if let endTime = attendance.endTime, let checkOut = attendance.checkOutTime {
                checkoutTime = timeF.string(from: checkOut)
                rightBarStyle = checkOut < endTime ? .bad : .good
            }
        } else {
            statusLabel.text = "Not Arrived"
        }
        
    }
    
}
