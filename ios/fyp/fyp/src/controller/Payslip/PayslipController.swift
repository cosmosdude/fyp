//
//  PayslipController.swift
//  fyp
//
//  Created by Thwin Htoo Aung on 29/3/24.
//

import UIKit
import Combine

class PayslipController: UIViewController {

    @IBOutlet private var tableView: UITableView!

    private var bag = Set<AnyCancellable>()
    
    private let payslipVM = PayslipVM()
    
    override func viewDidLoad() {
        super.viewDidLoad()
        
        tableView.register(PayslipCell.self)
        tableView.delegate = self
        tableView.dataSource = self
        
        payslipVM.$payslips.receive(on: DispatchQueue.main)
            .sink { [weak self] _ in self?.tableView?.reloadData() }
            .store(in: &bag)
        
        payslipVM.fetch()
    }
    
    override func viewDidAppear(_ animated: Bool) {
        super.viewDidAppear(animated)
        payslipVM.fetch()
    }
    
}

extension PayslipController: UITableViewDelegate {
    func tableView(_ tableView: UITableView, didSelectRowAt indexPath: IndexPath) {
        tableView.deselectRow(at: indexPath, animated: true)
        
        let vc = PayslipDetailController()
        vc.id = payslipVM.payslips[indexPath.row].id
        navigationController?.pushViewController(
            vc, animated: true
        )
    }
}

extension PayslipController: UITableViewDataSource {
    func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        payslipVM.payslips.count
    }
    
    func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        let cell = tableView.dequeueReusableCell(PayslipCell.self, for: indexPath)
        cell.render(payslipVM.payslips[indexPath.row])
        return cell
    }
}
