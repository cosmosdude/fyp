//
//  LeaveRequestController.swift
//  fyp
//
//  Created by Thwin Htoo Aung on 22/3/24.
//

import UIKit

class LeaveRequestController: UIViewController {

    @IBOutlet private var navBar: NavBarView!
    
    override func viewDidLoad() {
        super.viewDidLoad()
        navBar.backArrowBtn.addTarget(
            self, action: #selector(self.pop), for: .touchUpInside
        )
    }
    
}
