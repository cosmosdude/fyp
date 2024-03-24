//
//  AttendanceController.swift
//  fyp
//
//  Created by Thwin Htoo Aung on 24/3/24.
//

import UIKit

class AttendanceController: UIViewController {

    @IBOutlet private var navBar: NavBarView!
    
    override func viewDidLoad() {
        super.viewDidLoad()
        navBar.backArrowBtn.addTarget(self, action: #selector(pop), for: .touchUpInside)
        // Do any additional setup after loading the view.
    }


    /*
    // MARK: - Navigation

    // In a storyboard-based application, you will often want to do a little preparation before navigation
    override func prepare(for segue: UIStoryboardSegue, sender: Any?) {
        // Get the new view controller using segue.destination.
        // Pass the selected object to the new view controller.
    }
    */
    
    @IBAction
    private func didTapRequest() {
        navigationController?.pushViewController(
            AttendanceRequestController(),
            animated: true
        )
    }

}
