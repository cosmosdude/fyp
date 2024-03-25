//
//  AttendanceController.swift
//  fyp
//
//  Created by Thwin Htoo Aung on 24/3/24.
//

import UIKit
import Combine

class AttendanceController: UIViewController {

    @IBOutlet private var navBar: NavBarView!
    @IBOutlet private var recordView: AttendanceRecordListView!
    let attendanceVM = AttendanceVM()
    
    var bag = Set<AnyCancellable>()
    
    override func viewDidLoad() {
        super.viewDidLoad()
        navBar.backArrowBtn.addTarget(self, action: #selector(pop), for: .touchUpInside)
        // Do any additional setup after loading the view.
        attendanceVM.$attendances.receive(on: DispatchQueue.main)
            .sink { [weak self] in self?.recordView.records = $0 }
            .store(in: &bag)
        attendanceVM.setDateFromMonthStartToCurrentDate()
        attendanceVM.fetch()
    }
    
    override func viewDidAppear(_ animated: Bool) {
        super.viewDidAppear(animated)
        
        attendanceVM.fetch()
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
