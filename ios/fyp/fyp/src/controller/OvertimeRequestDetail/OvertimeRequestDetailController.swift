//
//  OvertimeRequestDetailController.swift
//  fyp
//
//  Created by Thwin Htoo Aung on 24/3/24.
//

import UIKit

class OvertimeRequestDetailController: UIViewController {
    
    @IBOutlet private var navBar: NavBarView!
    
    override func viewDidLoad() {
        super.viewDidLoad()
        navBar.backArrowBtn.addTarget(
            self, action: #selector(self.pop), for: .touchUpInside
        )
    }
}
