//
//  OvertimeController.swift
//  fyp
//
//  Created by Thwin Htoo Aung on 24/3/24.
//

import UIKit

class OvertimeController: UIViewController {
    
    @IBOutlet private var navBar: NavBarView!
    @IBOutlet private var listView: OvertimeHistoryView!
    
    override func viewDidLoad() {
        super.viewDidLoad()
        navBar.backArrowBtn.addTarget(self, action: #selector(pop), for: .touchUpInside)
        // Do any additional setup after loading the view.
        listView.items = (0..<100).map{$0}
        
        listView.didSelectItemAt = { [weak self] _ in
            self?.navigationController?.pushViewController(
                OvertimeRequestDetailController(),
                animated: true
            )
        }
    }

    @IBAction
    private func didTapRequest() {
        navigationController?.pushViewController(
            OvertimeRequestController(),
            animated: true
        )
    }

}


