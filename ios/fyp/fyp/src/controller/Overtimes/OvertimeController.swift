//
//  OvertimeController.swift
//  fyp
//
//  Created by Thwin Htoo Aung on 24/3/24.
//

import UIKit
import Combine

class OvertimeController: UIViewController {
    
    @IBOutlet private var navBar: NavBarView!
    @IBOutlet private var listView: OvertimeHistoryView!
    
    let vm = MyOTRequestsVM()
    var bag = Set<AnyCancellable>()
    
    override func viewDidLoad() {
        super.viewDidLoad()
        navBar.backArrowBtn.addTarget(self, action: #selector(pop), for: .touchUpInside)
        // Do any additional setup after loading the view.
        
        listView.didSelectItemAt = { [weak self] _ in
            self?.navigationController?.pushViewController(
                OvertimeRequestDetailController(),
                animated: true
            )
        }
        
        vm.$requests.receive(on: DispatchQueue.main)
            .sink { [weak self] in self?.listView.items = $0 }.store(in: &bag)
        
        vm.fetchRequests()
    }

    @IBAction
    private func didTapRequest() {
        navigationController?.pushViewController(
            OvertimeRequestController(),
            animated: true
        )
    }

}


