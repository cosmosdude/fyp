//
//  PayslipDetailController.swift
//  fyp
//
//  Created by Thwin Htoo Aung on 29/3/24.
//

import UIKit
import Combine

class PayslipDetailController: UIViewController {
    
    enum Sections: Int, CaseIterable {
        case customAllowances
        case allowances
        case deductions
        case customDeductions
        case total
        
        init?(_ index: Int) {
            self.init(rawValue: index)
        }
        
        init?(_ index: IndexPath) {
            self.init(rawValue: index.section)
        }
    }
    
    @IBOutlet private var navBar: NavBarView!
    
    @IBOutlet private var startDateLabel: UILabel!
    @IBOutlet private var endDateLabel: UILabel!
    @IBOutlet private var tableView: UITableView!
    
    @IBOutlet private var buttonContainer: UIView!
    @IBOutlet private var spinner: UIActivityIndicatorView!
    @IBOutlet private var button: UIButton!
    
    var id: String?
    
    var bag = Set<AnyCancellable>()
    
    let detailVM = PayslipDetailVM()
    let acknowledgeVM = PayslipAcknowledgeVM()
    
    override func viewDidLoad() {
        super.viewDidLoad()
        navBar.backArrowBtn.addTarget(
            self, action: #selector(self.pop), for: .touchUpInside
        )
        detailVM.id = id ?? ""
        acknowledgeVM.id = id ?? ""
        tableView.sectionHeaderTopPadding = 0
        tableView.registerHeaderFooter(PayslipItemTableHeader.self)
        tableView.registerHeaderFooter(PayslipItemTableFooter.self)
        tableView.register(PayslipItemTableCell.self)
        tableView.delegate = self
        tableView.dataSource = self
        
        detailVM.$payslip.receive(on: DispatchQueue.main)
            .sink { [weak self] in
                self?.navBar.title = $0?.detail.name ?? ""
                let f = DateFormatter().with(dateFormat: "d MMM")
                self?.startDateLabel.text = $0?.detail.from.map(f.string(from:)) ?? ""
                self?.endDateLabel.text = $0?.detail.to.map(f.string(from:)) ?? ""
                self?.buttonContainer.isHidden = $0?.detail.acknowledgedAt != nil
            }.store(in: &bag)
        
        acknowledgeVM.$status.receive(on: DispatchQueue.main)
            .sink { [weak self] in
                self?.button.isHidden = $0?.isProcessing ?? false
                self?.spinner.isHidden = !($0?.isProcessing ?? false)
                switch $0 {
                case .success:
                    self?.pop()
                case .failure(let error):
                    self?.presentAlert(
                        title: "Error",
                        message: "Unable to acknowledge payslip"
                    )
                default: ()
                }
            }.store(in: &bag)
        
        detailVM.fetchDetail()
    }
    
    override func viewDidAppear(_ animated: Bool) {
        super.viewDidAppear(animated)
        detailVM.fetchDetail()
    }
    
    @IBAction
    private func didTapAcknowledge() {
        acknowledgeVM.acknowledge()
    }
}


extension PayslipDetailController: UITableViewDelegate {
    func tableView(_ tableView: UITableView, heightForHeaderInSection section: Int) -> CGFloat {
        switch Sections(section) {
        case .customAllowances, .deductions:
            return UITableView.automaticDimension
        default: return 0
        }
    }
    
    func tableView(_ tableView: UITableView, heightForFooterInSection section: Int) -> CGFloat {
        switch Sections(section) {
        case .allowances, .customDeductions, .total:
            return UITableView.automaticDimension
        default: return 0
        }
    }
}

extension PayslipDetailController: UITableViewDataSource {
    func numberOfSections(in tableView: UITableView) -> Int {
        Sections.allCases.count
    }
    
    func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        switch Sections(section) {
        case .customAllowances: return 2
        case .allowances: return detailVM.allowances.count
        case .deductions: return detailVM.deductions.count
        case .customDeductions:
            return detailVM.relief == nil ? 2 : 3
        default: return 0
        }
    }
    
    func tableView(_ tableView: UITableView, viewForHeaderInSection section: Int) -> UIView? {
        let header = tableView.dequeueHeaderFooter(PayslipItemTableHeader.self)
        switch Sections(section) {
        case .customAllowances: 
            header.title = "Income"
        case .deductions: header.title = "Deductions"
        default: return nil
        }
        return header
    }
    
    func tableView(
        _ tableView: UITableView, viewForFooterInSection section: Int
    ) -> UIView? {
        let footer = tableView.dequeueHeaderFooter(PayslipItemTableFooter.self)
        switch Sections(section) {
        case .allowances: 
            footer.title = "Gross Income"
            footer.subtitle = detailVM.grossIncome
        case .customDeductions: 
            footer.title = "Gross Deduction"
            footer.subtitle = detailVM.grossDeduction
        case .total: 
            footer.title = "Net Salary"
            footer.subtitle = detailVM.netSalary
        default: return nil
        }
        return footer
    }
    
    func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        let cell = tableView.dequeueReusableCell(
            PayslipItemTableCell.self, for: indexPath
        )
        cell.render(style: .default)
        switch Sections(indexPath) {
        case .customAllowances:
            switch (indexPath.row) {
            case 0:
                cell.render(title: "Base Salary", subtitle: detailVM.salary)
            default:
                cell.render(title: "Overtime", subtitle: detailVM.overtime)
            }
        case .allowances:
            cell.render(
                detailVM.allowances[indexPath.row],
                salary: Double(detailVM.payslip?.detail.salary ?? 0)
            )
            cell.render(style: .income)
        case .deductions:
            cell.render(
                detailVM.deductions[indexPath.row],
                salary: Double(detailVM.payslip?.detail.salary ?? 0)
            )
            cell.render(style: .deduction)
        case .customDeductions:
            switch (indexPath.row) {
            case 0:
                cell.render(title: "Income Tax", subtitle: detailVM.tax)
            case 1:
                cell.render(title: "SSB", subtitle: detailVM.ssb)
            default:
                cell.render(title: "Relief", subtitle: detailVM.relief ?? "")
            }
        default: ()
        }
        
        return cell
    }
}
