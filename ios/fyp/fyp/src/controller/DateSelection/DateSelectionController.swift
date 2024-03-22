//
//  DateSelectionController.swift
//  fyp
//
//  Created by Thwin Htoo Aung on 22/3/24.
//

import UIKit

class DateSelectionController: UIViewController {

    @IBOutlet private(set) var datePicker: UIDatePicker!
    
    override var modalPresentationStyle: UIModalPresentationStyle {
        set { } get { .overFullScreen }
    }
    
    var didSelectDate: (Date) -> Void = {_ in}
    
    var preferredStyle: UIDatePickerStyle = .inline
    var mode: UIDatePicker.Mode = .date
    /// Initially selected date
    var date: Date?
    
    override func viewDidLoad() {
        super.viewDidLoad()
        datePicker.preferredDatePickerStyle = preferredStyle
        datePicker.datePickerMode = mode
        datePicker.date = date ?? Date()
    }
    
    @IBAction
    private func dismiss() {
        self.dismiss(animated: true)
    }
    
    @IBAction
    private func didTapToday() {
        datePicker.date = Date()
    }
    
    @IBAction
    private func didTapDone() {
        dismiss(animated: true) {
            [didSelectDate, date = datePicker.date] in
            didSelectDate(date)
        }
    }

}
