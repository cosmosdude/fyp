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
    
    @IBAction
    private func dismiss() {
        self.dismiss(animated: true)
    }

}
