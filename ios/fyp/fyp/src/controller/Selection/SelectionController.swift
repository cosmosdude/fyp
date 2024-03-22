//
//  SelectionController.swift
//  fyp
//
//  Created by Thwin Htoo Aung on 22/3/24.
//

import UIKit

class SelectionController: UIViewController {

    override var modalPresentationStyle: UIModalPresentationStyle {
        set { } get { .overFullScreen }
    }
    
    @IBAction
    private func dismiss() {
        self.dismiss(animated: false)
    }

}
